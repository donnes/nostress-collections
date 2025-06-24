import { Doc } from "convex/_generated/dataModel";
import { Card, CardContent } from "~/components/ui/card";
import { ITEM_OPTIONS } from "~/lib/game-data";
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
        <Card key={result.player?._id}>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg capitalize font-bold">
              {result.player?.name}
              {" → "}
              {result.armorSet?.displayName}
              {" → "}
              {result.item.piece}
            </h3>

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
