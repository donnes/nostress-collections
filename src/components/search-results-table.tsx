import { Doc } from "convex/_generated/dataModel";
import { CheckIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { ITEM_OPTIONS } from "~/lib/game-data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type SearchResultsTableProps = {
  searchResults: {
    item: Doc<"playerItems">;
    armorSet: Doc<"armorSets"> | null;
    player: Doc<"players"> | null;
  }[];
};

export function SearchResultsTable({ searchResults }: SearchResultsTableProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {searchResults.map((result) => (
        <Card key={`${result.player?._id}-${result.item.piece}`}>
          <CardContent className="p-4 space-y-2">
            <div className="flex flex-col space-y-1">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold">{result.player?.name}</h3>

                {result.item.isCompleted && (
                  <Badge
                    className="bg-emerald-500/10 text-emerald-500 whitespace-nowrap"
                    variant="outline"
                  >
                    <CheckIcon className="size-4 mr-1" />
                    Já possui
                  </Badge>
                )}
              </div>
              <h4 className="text-sm capitalize text-muted-foreground">
                {result.armorSet?.displayName} → {result.item.piece}
              </h4>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
              {result.item.options.map((option) => {
                const label = ITEM_OPTIONS[option as keyof typeof ITEM_OPTIONS];
                return (
                  <Tooltip
                    key={`${result.player?._id}-${result.item.piece}-${option}`}
                  >
                    <TooltipTrigger asChild>
                      <Button size="sm">{option}</Button>
                    </TooltipTrigger>
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
