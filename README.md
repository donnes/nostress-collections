# NoStress Collections - Mu Online Guild Collections

A comprehensive guild collection management system for Mu Online where guild members can share and manage their item collections for trading purposes.

## Database Structure

### Tables

#### `players`

- `name`: Player name (string)
- `createdAt`: Creation timestamp (number)
- `updatedAt`: Last update timestamp (number)

#### `armorSets`

- `name`: Set identifier (string)
- `displayName`: Human-readable set name (string)
- `pieces`: Array of available pieces (string[])
- `excludedPieces`: Array of pieces that don't apply to this set (string[])

#### `playerItems`

- `playerId`: Reference to player (Id<'players'>)
- `setId`: Reference to armor set (Id<'armorSets'>)
- `piece`: Item piece (string)
- `options`: Array of item options (string[])
- `createdAt`: Creation timestamp (number)
- `updatedAt`: Last update timestamp (number)

### Indexes

- `players.name`: Index on player names
- `armorSets.name`: Index on armor set names
- `playerItems.player`: Index on player items
- `playerItems.set`: Index on set items
- `playerItems.player_set_piece`: Composite index for efficient lookups

## Features

### Collection Management

- Spreadsheet-like interface displaying all armor sets
- Player selection with dropdown
- Edit/Save toggle for switching between view and edit modes
- Item editing with toggle buttons for quick option selection

### Armor Sets & Equipment

- 38 armor sets including Pad, Leather, Dragon, Sacred Fire, Storm Crow, etc.
- 5 equipment pieces per set: Helm, Armor, Pants, Gloves, Boots
- Set-specific rules for pieces that don't apply to certain sets

### Item Options System

- 7 possible options per item (max 4 per item):
  - MH = Increase maximum life
  - MM = Increase maximum mana
  - SD = Increase maximum SD
  - DD = Damage decrease
  - REF = Reflect damage
  - DSR = Defense success rate (PVM Only)
  - ZEN = Increases zen drop rate

### Advanced Search System

- Three-filter search using select dropdowns:
  - Set filter (choose specific armor set)
  - Item Part filter (helm, armor, pants, gloves, boots)
  - Option filter (choose specific item option)
- Flexible combinations - use any combination of the three filters
- Search results table showing matching items across all players

## Guild Members

The system is pre-configured with the following guild members:

- SuzarT
- Akirus
- Bobogama
- Donnes
- Evilzuda
- Filedanet
- Baiiano
- ZePancada
- NicTor
- OxodroLona
- SafadArk
- Semog
- sNik
- SURGIC4L
- mtx2k
- TekkyZera
- Tyrrasgo
- LoveMach

## Development

### Setup

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. The database will be automatically seeded with initial data

### Database Operations

- Seed database: `npm run dev:db` (runs automatically with dev)
- Clear database: Use the `clear` function in `convex/seed.ts`

### Convex Functions

- `guild-collections.ts`: Main functions for CRUD operations
- `seed.ts`: Database seeding and clearing functions
- `schema.ts`: Database schema definition

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Database**: Convex
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Routing**: TanStack Router
- **State Management**: TanStack Query + Convex

## Ready for Production

The system is ready for:

- Convex database integration (already implemented)
- Real-time collaboration (Convex provides this out of the box)
- Authentication system (add user management and permissions)
- Mobile responsiveness (Tailwind CSS provides this)
