import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { upsertPlayerItemSchema } from "./schema";

export const getPlayers = query({
  handler: async (ctx) => {
    return await ctx.db.query("players").collect();
  },
});

export const getArmorSets = query({
  handler: async (ctx) => {
    return await ctx.db.query("armorSets").collect();
  },
});

export const getPlayerItems = query({
  args: {
    playerId: v.optional(v.id("players")),
    setId: v.optional(v.id("armorSets")),
    piece: v.optional(v.string()),
  },
  handler: async (ctx, { playerId, setId, piece }) => {
    let items: Doc<"playerItems">[];

    if (playerId && setId) {
      // Use the composite index
      items = await ctx.db
        .query("playerItems")
        .withIndex("player_set_piece", (q) =>
          q.eq("playerId", playerId).eq("setId", setId)
        )
        .collect();
    } else if (playerId) {
      items = await ctx.db
        .query("playerItems")
        .withIndex("player", (q) => q.eq("playerId", playerId))
        .collect();
    } else if (setId) {
      items = await ctx.db
        .query("playerItems")
        .withIndex("set", (q) => q.eq("setId", setId))
        .collect();
    } else {
      items = await ctx.db.query("playerItems").collect();
    }

    if (piece) {
      return items.filter((item) => item.piece === piece);
    }

    return items;
  },
});

export const getPlayerCollection = query({
  args: { playerId: v.id("players") },
  handler: async (ctx, { playerId }) => {
    const [player, items, armorSets] = await Promise.all([
      ctx.db.get(playerId),
      ctx.db
        .query("playerItems")
        .withIndex("player", (q) => q.eq("playerId", playerId))
        .collect(),
      ctx.db.query("armorSets").collect(),
    ]);

    if (!player) return null;

    return {
      player,
      items,
      armorSets,
    };
  },
});

export const getSearchItems = query({
  args: {
    setId: v.optional(v.id("armorSets")),
    piece: v.optional(v.string()),
    options: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { setId, piece, options }) => {
    if (!setId && !piece && !options) {
      return [];
    }

    let items: Doc<"playerItems">[];

    if (setId) {
      items = await ctx.db
        .query("playerItems")
        .withIndex("set", (q) => q.eq("setId", setId))
        .collect();
    } else {
      items = await ctx.db.query("playerItems").collect();
    }

    let filteredItems = items;

    if (piece) {
      filteredItems = filteredItems.filter((item) => item.piece === piece);
    }

    if (options) {
      filteredItems = filteredItems.filter((item) =>
        options.every((option) => item.options.includes(option))
      );
    }

    // Get player and armor set details for each item
    const results = await Promise.all(
      filteredItems.map(async (item) => {
        const [player, armorSet] = await Promise.all([
          ctx.db.get(item.playerId),
          ctx.db.get(item.setId),
        ]);

        return {
          item,
          player,
          armorSet,
        };
      })
    );

    return results.filter((result) => result.player && result.armorSet);
  },
});

export const upsertPlayerItem = mutation({
  args: upsertPlayerItemSchema,
  handler: async (ctx, { playerId, setId, piece, options }) => {
    // Check if item already exists
    const existingItem = await ctx.db
      .query("playerItems")
      .withIndex("player_set_piece", (q) =>
        q.eq("playerId", playerId).eq("setId", setId).eq("piece", piece)
      )
      .first();

    if (existingItem) {
      // Update existing item
      return await ctx.db.patch(existingItem._id, {
        options,
      });
    } else {
      // Create new item
      return await ctx.db.insert("playerItems", {
        playerId,
        setId,
        piece,
        options,
      });
    }
  },
});
