"use client";

import { Doc } from "convex/_generated/dataModel";
import { Edit, Save } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ITEM_OPTIONS } from "~/lib/game-data";

type PlayerSelectionProps = {
  players: Doc<"players">[];
};

export function PlayerSelection({ players }: PlayerSelectionProps) {
  const [queryStates, setQueryStates] = useQueryStates({
    player: parseAsString.withDefault(players[0]._id),
    editing: parseAsBoolean.withDefault(false),
  });

  const selectedPlayer = players.find(
    (player) => player._id === queryStates.player
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Selecionar membro
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

        {selectedPlayer && (
          <Button
            onClick={() => setQueryStates({ editing: !queryStates.editing })}
            variant={queryStates.editing ? "default" : "outline"}
          >
            {queryStates.editing ? (
              <>
                <Save className="size-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit className="size-4" />
                Editar
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground mb-2">
          Legenda de Options
        </label>

        <div className="flex flex-wrap gap-2">
          {Object.entries(ITEM_OPTIONS).map(([key, label]) => (
            <Badge
              key={key}
              className="text-muted-foreground"
              variant="outline"
            >
              <span className="font-bold text-foreground">{key}</span>: {label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
