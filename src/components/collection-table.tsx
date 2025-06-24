"use client";

import { useMutation, useQuery } from "convex/react";
import { CheckIcon, EditIcon } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useCallback } from "react";

import { api } from "convex/_generated/api";
import { Doc, Id } from "convex/_generated/dataModel";
import { toast } from "sonner";
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
import { ITEM_OPTIONS, ITEM_PIECES } from "~/lib/game-data";

type CollectionTableProps = {
  players: Doc<"players">[];
};

export function CollectionTable({ players }: CollectionTableProps) {
  const [queryStates, setQueryStates] = useQueryStates({
    player: parseAsString.withDefault(players[0]._id),
    editing: parseAsBoolean.withDefault(false),
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

  const getItemOptions = useCallback(
    (setId: Id<"armorSets">, piece: string) => {
      const existingItem = playerCollection?.items?.find(
        (item) => item.setId === setId && item.piece === piece
      );
      return existingItem?.options || [];
    },
    [playerCollection?.items]
  );

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
                <SelectTrigger className="bg-background border-border text-foreground w-64">
                  <SelectValue placeholder="Choose a player" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {players.map((player) => (
                    <SelectItem key={player._id} value={player._id}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          {playerCollection?.armorSets.map((set) => (
            <TableRow key={set._id}>
              <TableCell>{set.displayName}</TableCell>
              {Object.keys(ITEM_PIECES).map((piece) => {
                const itemOptions = getItemOptions(set._id, piece);

                if (set.excludedPieces?.includes(piece)) {
                  return (
                    <TableCell
                      key={`${set._id}-${piece}`}
                      className="bg-[repeating-linear-gradient(45deg,#dc2626,#dc2626_10px,#450a0a_10px,#450a0a_20px)]"
                    >
                      &nbsp;
                    </TableCell>
                  );
                }

                if (queryStates.editing) {
                  return (
                    <TableCell key={`${set._id}-${piece}`}>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
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
                                  size="sm"
                                  disabled={
                                    !isSelected && itemOptions.length >= 4
                                  }
                                >
                                  {key}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>
                  );
                }

                if (itemOptions.length === 0) {
                  return <TableCell key={`${set._id}-${piece}`}>N/A</TableCell>;
                }

                return (
                  <TableCell key={`${set._id}-${piece}`}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                      {itemOptions.map((option) => {
                        return (
                          <Button
                            key={`${set._id}-${piece}-${option}`}
                            onClick={() => {}}
                            size="sm"
                            disabled
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
