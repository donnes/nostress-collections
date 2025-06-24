// Item options available in Mu Online
export const ITEM_OPTIONS = {
  MH: 'Increase maximum life',
  MM: 'Increase maximum mana',
  SD: 'Increase maximum SD',
  DD: 'Damage decrease',
  REF: 'Reflect damage',
  DSR: 'Defense success rate (PVM Only)',
  ZEN: 'Increases zen drop rate',
} as const

export type ItemOption = keyof typeof ITEM_OPTIONS

// Item pieces
export const ITEM_PIECES = {
  helm: 'Helm',
  armor: 'Armor',
  pants: 'Pants',
  gloves: 'Gloves',
  boots: 'Boots',
} as const

export type ItemPiece = keyof typeof ITEM_PIECES

// Armor sets with their excluded pieces
export const ARMOR_SETS = {
  pad: { name: 'Pad', excludedPieces: [] as ItemPiece[] },
  leather: { name: 'Leather', excludedPieces: [] as ItemPiece[] },
  dragon: { name: 'Dragon', excludedPieces: [] as ItemPiece[] },
  sacred_fire: { name: 'Sacred Fire', excludedPieces: ['boots'] as ItemPiece[] },
  storm_crow: { name: 'Storm Crow', excludedPieces: ['helm'] as ItemPiece[] },
  storm_zahard: { name: 'Storm Zahard', excludedPieces: ['boots'] as ItemPiece[] },
  thunder_hawk: { name: 'Thunder Hawk', excludedPieces: ['helm'] as ItemPiece[] },
  hurricane: { name: 'Hurricane', excludedPieces: ['helm'] as ItemPiece[] },
  piercing_grove: { name: 'Piercing Grove', excludedPieces: ['gloves'] as ItemPiece[] },
  ancient: { name: 'Ancient', excludedPieces: [] as ItemPiece[] },
  dark_soul: { name: 'Dark Soul', excludedPieces: [] as ItemPiece[] },
  grand_soul: { name: 'Grand Soul', excludedPieces: [] as ItemPiece[] },
  divine: { name: 'Divine', excludedPieces: [] as ItemPiece[] },
  thunder: { name: 'Thunder', excludedPieces: [] as ItemPiece[] },
  great_dragon: { name: 'Great Dragon', excludedPieces: [] as ItemPiece[] },
  dark_phoenix: { name: 'Dark Phoenix', excludedPieces: [] as ItemPiece[] },
  red_spirit: { name: 'Red Spirit', excludedPieces: [] as ItemPiece[] },
  light_plate: { name: 'Light Plate', excludedPieces: [] as ItemPiece[] },
  adamantine: { name: 'Adamantine', excludedPieces: [] as ItemPiece[] },
  dark_steel: { name: 'Dark Steel', excludedPieces: [] as ItemPiece[] },
  dark_master: { name: 'Dark Master', excludedPieces: [] as ItemPiece[] },
  dragon_knight: { name: 'Dragon Knight', excludedPieces: [] as ItemPiece[] },
  venom: { name: 'Venom', excludedPieces: [] as ItemPiece[] },
  sylphid: { name: 'Sylphid', excludedPieces: [] as ItemPiece[] },
  volcano: { name: 'Volcano', excludedPieces: [] as ItemPiece[] },
  sunlight: { name: 'Sunlight', excludedPieces: [] as ItemPiece[] },
  ash: { name: 'Ash', excludedPieces: [] as ItemPiece[] },
  crystal: { name: 'Crystal', excludedPieces: [] as ItemPiece[] },
  chaos: { name: 'Chaos', excludedPieces: [] as ItemPiece[] },
  grace: { name: 'Grace', excludedPieces: [] as ItemPiece[] },
  soul: { name: 'Soul', excludedPieces: [] as ItemPiece[] },
  spirit: { name: 'Spirit', excludedPieces: [] as ItemPiece[] },
  guardian: { name: 'Guardian', excludedPieces: [] as ItemPiece[] },
  storm: { name: 'Storm', excludedPieces: [] as ItemPiece[] },
  nightmare: { name: 'Nightmare', excludedPieces: [] as ItemPiece[] },
  saint: { name: 'Saint', excludedPieces: [] as ItemPiece[] },
  immortal: { name: 'Immortal', excludedPieces: [] as ItemPiece[] },
  mystic: { name: 'Mystic', excludedPieces: [] as ItemPiece[] },
  phantom: { name: 'Phantom', excludedPieces: [] as ItemPiece[] },
  seraphim: { name: 'Seraphim', excludedPieces: [] as ItemPiece[] },
} as const

export type ArmorSetKey = keyof typeof ARMOR_SETS

// Helper functions
export function getOptionDescription(option: ItemOption): string {
  return ITEM_OPTIONS[option]
}

export function getPieceDisplayName(piece: ItemPiece): string {
  return ITEM_PIECES[piece]
}

export function getArmorSetDisplayName(setKey: ArmorSetKey): string {
  return ARMOR_SETS[setKey].name
}

export function getArmorSetExcludedPieces(setKey: ArmorSetKey): ItemPiece[] {
  return ARMOR_SETS[setKey].excludedPieces
}

export function isValidPieceForSet(setKey: ArmorSetKey, piece: ItemPiece): boolean {
  return !getArmorSetExcludedPieces(setKey).includes(piece)
}

export function getAvailablePiecesForSet(setKey: ArmorSetKey): ItemPiece[] {
  const allPieces: ItemPiece[] = ['helm', 'armor', 'pants', 'gloves', 'boots']
  const excludedPieces = getArmorSetExcludedPieces(setKey)
  return allPieces.filter(piece => !excludedPieces.includes(piece))
}

// Color coding for options
export const OPTION_COLORS = {
  MH: 'bg-red-500',
  MM: 'bg-blue-500',
  SD: 'bg-green-500',
  DD: 'bg-yellow-500',
  REF: 'bg-purple-500',
  DSR: 'bg-orange-500',
  ZEN: 'bg-pink-500',
} as const

export function getOptionColor(option: ItemOption): string {
  return OPTION_COLORS[option]
}

// Collection completion helpers
export function calculateSetCompletion(
  setKey: ArmorSetKey,
  items: Record<string, any> | null
): { completed: number; total: number; percentage: number } {
  if (!items) {
    return { completed: 0, total: 0, percentage: 0 }
  }

  const availablePieces = getAvailablePiecesForSet(setKey)
  const total = availablePieces.length
  const completed = availablePieces.filter(piece =>
    items[piece] && items[piece].options && items[piece].options.length > 0
  ).length

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}

export function calculatePlayerCompletion(
  collections: Record<string, Record<string, any>>
): { completed: number; total: number; percentage: number } {
  let totalSets = 0
  let completedSets = 0

  for (const [setKey, items] of Object.entries(collections)) {
    const setCompletion = calculateSetCompletion(setKey as ArmorSetKey, items)
    if (setCompletion.total > 0) {
      totalSets++
      if (setCompletion.percentage === 100) {
        completedSets++
      }
    }
  }

  return {
    completed: completedSets,
    total: totalSets,
    percentage: totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0
  }
}