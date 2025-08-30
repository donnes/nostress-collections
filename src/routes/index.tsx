import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useLocation } from "@tanstack/react-router";

import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { AdvancedSearch } from "~/components/advanced-search";
import { CollectionTable } from "~/components/collection-table";
import { Loader } from "~/components/loader";
import { SearchResultsTable } from "~/components/search-results-table";
import { Card, CardContent } from "~/components/ui/card";
import { loadSearchParams } from "./searchParams";

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => <Loader />,
});

function Home() {
  const location = useLocation();

  const searchParams = loadSearchParams(location.search);

  const { data: armorSets } = useSuspenseQuery(
    convexQuery(api.guildCollections.getArmorSets, {})
  );
  const { data: players } = useSuspenseQuery(
    convexQuery(api.guildCollections.getPlayers, {})
  );

  const setId = armorSets.find(
    (set) => set.name === searchParams.searchSet
  )?._id;
  const searchResults = useQuery(api.guildCollections.getSearchItems, {
    setId: setId,
    piece: searchParams.searchPiece ?? undefined,
    options: searchParams.searchOptions ?? undefined,
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 space-y-2 text-center">
        <div className="flex items-center space-x-4 justify-center">
          <img src="/logo-cross.png" alt="DominiuM" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-foreground">
            DominiuM - Collections
          </h1>
        </div>
        <p className="text-muted-foreground">
          Gerencie sua própria collection ou confira as collections dos demais
          membros da guild.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <AdvancedSearch armorSets={armorSets} />

        <Card>
          <CardContent className="pt-6">
            {searchResults && searchResults.length > 0 ? (
              <SearchResultsTable searchResults={searchResults} />
            ) : (
              <CollectionTable players={players} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
