import { internalMutation } from "./_generated/server";

// Armor sets data based on the project overview
const ARMOR_SETS = [
  {
    name: "pad",
    displayName: "Pad",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "leather",
    displayName: "Leather",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "vine",
    displayName: "Vine",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "bronze",
    displayName: "Bronze",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "silk",
    displayName: "Silk",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "bone",
    displayName: "Bone",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "scale",
    displayName: "Scale",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "wind",
    displayName: "Wind",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "violent_wind",
    displayName: "Violent Wind",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "sphinx",
    displayName: "Sphinx",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "brass",
    displayName: "Brass",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "spirit",
    displayName: "Spirit",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "plate",
    displayName: "Plate",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "legendary",
    displayName: "Legendary",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "red_winged",
    displayName: "Red Winged",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "guardian",
    displayName: "Guardian",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "dragon",
    displayName: "Dragon",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "light_plate",
    displayName: "Light Plate",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "sacred_fire",
    displayName: "Sacred Fire",
    pieces: ["helm", "armor", "pants", "gloves"],
    excludedPieces: ["boots"],
  },
  {
    name: "ancient",
    displayName: "Ancient",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "adamantine",
    displayName: "Adamantine",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "storm_crow",
    displayName: "Storm Crow",
    pieces: ["armor", "pants", "gloves", "boots"],
    excludedPieces: ["helm"],
  },
  {
    name: "storm_zahard",
    displayName: "Storm Zahard",
    pieces: ["helm", "armor", "pants", "gloves"],
    excludedPieces: ["boots"],
  },
  {
    name: "black_dragon",
    displayName: "Black Dragon",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "demonic",
    displayName: "Demonic",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "grand_soul",
    displayName: "Grand Soul",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "holy_spirit",
    displayName: "Holy Spirit",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "dark_steel",
    displayName: "Dark Steel",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "dark_phoenix",
    displayName: "Dark Pheonix",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "thunder_hawk",
    displayName: "Thunder Hawk",
    pieces: ["armor", "pants", "gloves", "boots"],
    excludedPieces: ["helm"],
  },
  {
    name: "great_dragon",
    displayName: "Great Dragon",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "dark_soul",
    displayName: "Dark Soul",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "hurricane",
    displayName: "Hurricane",
    pieces: ["armor", "pants", "gloves", "boots"],
    excludedPieces: ["helm"],
  },
  {
    name: "red_spirit",
    displayName: "Red Spirit",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "dark_master",
    displayName: "Dark Master",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "storm_blitz",
    displayName: "Storm Blitz",
    pieces: ["helm", "armor", "pants", "gloves", "boots"],
  },
  {
    name: "piercing_grove",
    displayName: "Piercing Grove",
    pieces: ["helm", "armor", "pants", "boots"],
    excludedPieces: ["gloves"],
  },
];

// Player names from the guild
const PLAYERS = [
  "SuzarT",
  "Akirus",
  "Bobogama",
  "Donnes",
  "Evilzuda",
  "Filedanet",
  "Baiiano",
  "ZePancada",
  "NicTor",
  "OxodroLona",
  "SafadArk",
  "Semog",
  "sNik",
  "SURGIC4L",
  "mtx2k",
  "TekkyZera",
  "Tyrrasgo",
  "LoveMach",
];

export const seed = internalMutation(async (ctx) => {
  const now = Date.now();

  // Check if data already exists
  const existingPlayers = await ctx.db.query("players").collect();
  const existingArmorSets = await ctx.db.query("armorSets").collect();

  if (existingPlayers.length === 0) {
    // Create players
    await Promise.all(
      PLAYERS.map((name) =>
        ctx.db.insert("players", {
          name,
          createdAt: now,
          updatedAt: now,
        })
      )
    );
  }

  if (existingArmorSets.length === 0) {
    // Create armor sets
    await Promise.all(
      ARMOR_SETS.map((set) =>
        ctx.db.insert("armorSets", {
          name: set.name,
          displayName: set.displayName,
          pieces: set.pieces,
          excludedPieces: set.excludedPieces,
        })
      )
    );
  }

  console.log(
    `Seeded database with ${PLAYERS.length} players and ${ARMOR_SETS.length} armor sets`
  );
});

export const clear = internalMutation(async (ctx) => {
  // Clear all data
  const [players, armorSets, playerItems] = await Promise.all([
    ctx.db.query("players").collect(),
    ctx.db.query("armorSets").collect(),
    ctx.db.query("playerItems").collect(),
  ]);

  // Delete in order to respect foreign key constraints
  for (const item of playerItems) {
    await ctx.db.delete(item._id);
  }

  for (const player of players) {
    await ctx.db.delete(player._id);
  }

  for (const set of armorSets) {
    await ctx.db.delete(set._id);
  }

  console.log("Cleared all data from database");
});
