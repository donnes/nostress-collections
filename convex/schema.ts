import { defineSchema, defineTable } from "convex/server";
import { type Infer, v } from "convex/values";

const schema = defineSchema({
  players: defineTable({
    name: v.string(),
  }).index("name", ["name"]),

  armorSets: defineTable({
    name: v.string(),
    displayName: v.string(),
    pieces: v.array(v.string()), // ['helm', 'armor', 'pants', 'gloves', 'boots']
    excludedPieces: v.optional(v.array(v.string())), // pieces that don't apply to this set
  }).index("name", ["name"]),

  playerItems: defineTable({
    playerId: v.id("players"),
    setId: v.id("armorSets"),
    piece: v.string(), // 'helm', 'armor', 'pants', 'gloves', 'boots'
    options: v.array(v.string()), // ['MH', 'MM', 'SD', 'DD', 'REF', 'DSR', 'ZEN']
    isCompleted: v.optional(v.boolean()),
  })
    .index("player", ["playerId"])
    .index("set", ["setId"])
    .index("player_set_piece", ["playerId", "setId", "piece"]),
});

export default schema;

// Validators
const player = schema.tables.players.validator;
const armorSet = schema.tables.armorSets.validator;
const playerItem = schema.tables.playerItems.validator;

// Export types
export type Player = Infer<typeof player>;
export type ArmorSet = Infer<typeof armorSet>;
export type PlayerItem = Infer<typeof playerItem>;

export const updatePlayerItemSchema = v.object({
  id: v.id("playerItems"),
  options: playerItem.fields.options,
});

export const upsertPlayerItemSchema = v.object({
  playerId: v.id("players"),
  setId: v.id("armorSets"),
  piece: v.string(),
  options: playerItem.fields.options,
});
