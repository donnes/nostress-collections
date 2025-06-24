import { XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Doc } from "convex/_generated/dataModel";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ITEM_OPTIONS } from "~/lib/game-data";
import { searchParams } from "~/routes/searchParams";

export function AdvancedSearch({
  armorSets,
}: {
  armorSets: Doc<"armorSets">[];
}) {
  const [queryStates, setQueryStates] = useQueryStates(searchParams);

  function onClearSearch() {
    setQueryStates({
      searchSet: null,
      searchPiece: null,
      searchOptions: null,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Busca avançada</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Set
            </label>
            <Select
              value={queryStates.searchSet || ""}
              onValueChange={(value) => setQueryStates({ searchSet: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border max-h-60">
                {armorSets.map((set) => (
                  <SelectItem key={set._id} value={set.name}>
                    {set.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Parte do Set
            </label>
            <Select
              value={queryStates.searchPiece || ""}
              onValueChange={(value) => setQueryStates({ searchPiece: value })}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="helm">Helm</SelectItem>
                <SelectItem value="armor">Armor</SelectItem>
                <SelectItem value="pants">Pants</SelectItem>
                <SelectItem value="gloves">Gloves</SelectItem>
                <SelectItem value="boots">Boots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Options
            </label>
            <div className="grid grid-cols-7 gap-1">
              {Object.entries(ITEM_OPTIONS).map(([key, label]) => {
                const isSelected = queryStates.searchOptions?.includes(key);

                return (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {
                          setQueryStates({
                            searchOptions: isSelected
                              ? queryStates.searchOptions?.filter(
                                  (o) => o !== key
                                )
                              : [...(queryStates.searchOptions || []), key],
                          });
                        }}
                        variant={isSelected ? "default" : "outline"}
                        disabled={
                          !isSelected &&
                          (queryStates.searchOptions?.length || 0) >= 4
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
          </div>

          <div className="flex items-end md:justify-end gap-2">
            <Button
              onClick={onClearSearch}
              variant="outline"
              disabled={
                !queryStates.searchSet &&
                !queryStates.searchPiece &&
                !queryStates.searchOptions
              }
            >
              <XIcon className="size-4" />
              Limpar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
