import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useLocation } from "@tanstack/react-router";

import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { AdvancedSearch } from "~/components/advanced-search";
import { CollectionTable } from "~/components/collection-table";
import { Header } from "~/components/header";
import { Loader } from "~/components/loader";
import { SearchResultsTable } from "~/components/search-results-table";
import { Card, CardContent } from "~/components/ui/card";
import { loadSearchParams } from "./searchParams";

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => <Loader />,
  beforeLoad: async (ctx) => {
    if (!ctx.context.userId) {
      throw redirect({ to: "/signin" });
    }
  },
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
      <Header />

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
