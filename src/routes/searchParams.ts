import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { ITEM_OPTIONS } from "~/lib/game-data";

export const searchParams = {
  searchSet: parseAsString.withOptions({ clearOnDefault: true }),
  searchPiece: parseAsString.withOptions({ clearOnDefault: true }),
  searchOptions: parseAsArrayOf(
    parseAsStringEnum(Object.keys(ITEM_OPTIONS))
  ).withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(searchParams);
