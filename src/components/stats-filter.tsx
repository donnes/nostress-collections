"use client";

import { parseAsString, useQueryStates } from "nuqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Common stats found in armor sets
const ARMOR_STATS = [
  { value: "all", label: "All Stats" },
  { value: "Increases Max Life", label: "Max Life" },
  { value: "Increases Atk Speed", label: "Attack Speed" },
  { value: "Increases DMG", label: "Damage" },
  { value: "Increases Max Defense", label: "Max Defense" },
  { value: "Increases SD", label: "SD" },
  { value: "EXE DMG Resistence", label: "EXE DMG Resistance" },
  { value: "EXE DMG Rate", label: "EXE DMG Rate" },
  { value: "Critical DMG Resistence", label: "Critical DMG Resistance" },
  { value: "Reflect DMG", label: "Reflect Damage" },
  { value: "DD", label: "Damage Decrease" },
] as const;

type StatsFilterProps = {
  className?: string;
};

export function StatsFilter({ className }: StatsFilterProps) {
  const [queryStates, setQueryStates] = useQueryStates({
    statsFilter: parseAsString.withDefault("all"),
  });

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        Filtrar por Stats
      </label>
      <Select
        value={queryStates.statsFilter}
        onValueChange={(value) => setQueryStates({ statsFilter: value })}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Choose stats" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {ARMOR_STATS.map((stat) => (
            <SelectItem key={stat.value} value={stat.value}>
              {stat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
