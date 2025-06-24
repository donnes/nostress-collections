import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "convex/_generated/api";
import { AdvancedSearch } from "~/components/advanced-search";
import { CollectionTable } from "~/components/collection-table";
import { Loader } from "~/components/loader";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => <Loader />,
});

function Home() {
  const { data: armorSets } = useSuspenseQuery(
    convexQuery(api.guildCollections.getArmorSets, {})
  );
  const { data: players } = useSuspenseQuery(
    convexQuery(api.guildCollections.getPlayers, {})
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 space-y-2 text-center">
        <div className="flex items-center space-x-4 justify-center">
          <img src="/nostress.png" alt="NoStress" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-foreground">
            NoStress - Collections
          </h1>
        </div>
        <p className="text-muted-foreground">
          Gerencie sua própria collection ou confirma as collections dos demais
          membros da guild.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <AdvancedSearch armorSets={armorSets} />

        <Card>
          <CardContent className="pt-6">
            <CollectionTable players={players} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
