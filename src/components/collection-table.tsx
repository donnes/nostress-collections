"use client";

import { useMutation, useQuery } from "convex/react";
import { CheckIcon, EditIcon, StarIcon, StarOffIcon } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { api } from "convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";
import { StatsFilter } from "~/components/stats-filter";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { getItemOptions, ITEM_OPTIONS, ITEM_PIECES } from "~/lib/game-data";

type CollectionTableProps = {
  players: Doc<"players">[];
};

export function CollectionTable({ players }: CollectionTableProps) {
  const [queryStates, setQueryStates] = useQueryStates({
    player: parseAsString.withDefault(players[0]._id),
    editing: parseAsBoolean.withDefault(false),
    statsFilter: parseAsString.withDefault("all"),
  });

  const playerCollection = useQuery(api.guildCollections.getPlayerCollection, {
    playerId: queryStates.player as Id<"players">,
  });

  const upsertPlayerItemMutation = useMutation(
    api.guildCollections.upsertPlayerItem
  ).withOptimisticUpdate((localStore, args) => {
    const { playerId, setId, piece, options } = args;

    // Update the player collection query with the new options
    const currentCollection = localStore.getQuery(
      api.guildCollections.getPlayerCollection,
      { playerId }
    );

    if (currentCollection) {
      const updatedItems = currentCollection.items.map((item) =>
        item.setId === setId && item.piece === piece
          ? { ...item, options }
          : item
      );

      localStore.setQuery(
        api.guildCollections.getPlayerCollection,
        { playerId },
        {
          ...currentCollection,
          items: updatedItems,
        }
      );
    }

    toast.success("Item atualizado");
  });

  const toggleItemCompletionMutation = useMutation(
    api.guildCollections.toggleItemCompletion
  ).withOptimisticUpdate((localStore, args) => {
    const { playerId, setId, piece } = args;

    // Update the player collection query with the new options
    const currentCollection = localStore.getQuery(
      api.guildCollections.getPlayerCollection,
      { playerId }
    );

    if (currentCollection) {
      const updatedItems = currentCollection.items.map((item) =>
        item.setId === setId && item.piece === piece
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      );

      localStore.setQuery(
        api.guildCollections.getPlayerCollection,
        { playerId },
        {
          ...currentCollection,
          items: updatedItems,
        }
      );
    }
  });

  const handleOptionToggle = useCallback(
    async (setId: Id<"armorSets">, piece: string, option: string) => {
      // Find existing item to get current options
      const existingItem = playerCollection?.items?.find(
        (item) => item.setId === setId && item.piece === piece
      );

      let currentOptions = existingItem?.options || [];

      // Toggle the option
      const optionIndex = currentOptions.indexOf(option);
      if (optionIndex >= 0) {
        currentOptions.splice(optionIndex, 1);
      } else {
        if (currentOptions.length >= 4) {
          toast.error("Maximum 4 options allowed per item");
          return;
        }
        currentOptions.push(option);
      }

      // Use optimistic update
      await upsertPlayerItemMutation({
        playerId: queryStates.player as Id<"players">,
        setId,
        piece,
        options: currentOptions,
      });
    },
    [queryStates.player, playerCollection?.items, upsertPlayerItemMutation]
  );

  const handleToggleItemCompletion = useCallback(
    async (setId: Id<"armorSets">, piece: string) => {
      await toggleItemCompletionMutation({
        playerId: queryStates.player as Id<"players">,
        setId,
        piece,
      });
    },
    [queryStates.player, toggleItemCompletionMutation]
  );

  // Filter armor sets by stats
  const filteredArmorSets = useMemo(() => {
    if (!playerCollection?.armorSets || queryStates.statsFilter === "all") {
      return playerCollection?.armorSets || [];
    }

    return playerCollection.armorSets.filter((set) => {
      if (!set.stats) return false;
      return set.stats.includes(queryStates.statsFilter);
    });
  }, [playerCollection?.armorSets, queryStates.statsFilter]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Selecionar jogador
              </label>
              <Select
                value={queryStates.player}
                onValueChange={(value) => setQueryStates({ player: value })}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose a player" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {players.map((player) => (
                    <SelectItem key={player._id} value={player._id}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <StatsFilter />
          </div>

          <Button
            type="button"
            onClick={() => setQueryStates({ editing: !queryStates.editing })}
          >
            {queryStates.editing ? (
              <>
                <CheckIcon className="size-4" />
                Finalizar
              </>
            ) : (
              <>
                <EditIcon className="size-4" />
                Editar
              </>
            )}
          </Button>
        </div>
      </div>

      {queryStates.statsFilter && queryStates.statsFilter !== "all" && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <span>
            Showing {filteredArmorSets.length} of{" "}
            {playerCollection?.armorSets.length || 0} armor sets
          </span>
          <span className="text-blue-400">
            (filtered by: {queryStates.statsFilter})
          </span>
        </div>
      )}

      <Table className="border table-fixed">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Set</TableHead>
            <TableHead>Helm</TableHead>
            <TableHead>Armor</TableHead>
            <TableHead>Pants</TableHead>
            <TableHead>Gloves</TableHead>
            <TableHead>Boots</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredArmorSets.map((set) => {
            const isSetCompleted =
              (playerCollection?.items || []).filter(
                (item) => item.setId === set._id && item.isCompleted
              ).length === Object.keys(ITEM_PIECES).length;

            return (
              <TableRow key={`${set._id}-${queryStates.player}`}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span>{set.displayName}</span>
                    {set.stats && (
                      <span className="text-xs text-blue-400">{set.stats}</span>
                    )}
                  </div>
                </TableCell>
                {Object.keys(ITEM_PIECES).map((piece) => {
                  const isCompleted = playerCollection?.items.find(
                    (item) => item.setId === set._id && item.piece === piece
                  )?.isCompleted;

                  const pieceKey = `${set._id}-${piece}-${queryStates.player}`;

                  const itemOptions = getItemOptions(
                    set._id,
                    piece,
                    playerCollection?.items || []
                  );

                  if (set.excludedPieces?.includes(piece)) {
                    return (
                      <TableCell
                        key={`${set._id}-${piece}-${queryStates.player}`}
                        className="stripe-forbidden"
                      >
                        &nbsp;
                      </TableCell>
                    );
                  }

                  if (!queryStates.editing && isCompleted) {
                    return <TableCell key={pieceKey}>✅</TableCell>;
                  }

                  if (queryStates.editing) {
                    return (
                      <TableCell key={pieceKey}>
                        <div className="flex flex-wrap items-center gap-1">
                          {Object.entries(ITEM_OPTIONS).map(([key, label]) => {
                            const isSelected = itemOptions.includes(key);

                            return (
                              <Tooltip key={key}>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={() =>
                                      handleOptionToggle(set._id, piece, key)
                                    }
                                    variant={isSelected ? "default" : "outline"}
                                    size="icon"
                                    disabled={
                                      (!isSelected &&
                                        itemOptions.length >= 4) ||
                                      isCompleted
                                    }
                                  >
                                    {key}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>{label}</TooltipContent>
                              </Tooltip>
                            );
                          })}

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() =>
                                  handleToggleItemCompletion(set._id, piece)
                                }
                                variant="outline"
                                size="icon"
                              >
                                {!isCompleted ? (
                                  <StarIcon className="!size-5" />
                                ) : (
                                  <StarOffIcon className="!size-5" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isCompleted
                                ? "Desmarcar item"
                                : "Marcar item como obtido"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                  }

                  if (itemOptions.length === 0) {
                    return <TableCell key={pieceKey}>N/A</TableCell>;
                  }

                  return (
                    <TableCell key={pieceKey}>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                        {itemOptions.map((option) => {
                          const label =
                            ITEM_OPTIONS[option as keyof typeof ITEM_OPTIONS];
                          return (
                            <Tooltip key={`${set._id}-${piece}-${option}`}>
                              <TooltipTrigger asChild>
                                <Button size="icon">{option}</Button>
                              </TooltipTrigger>
                              <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
