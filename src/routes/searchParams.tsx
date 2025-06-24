import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { ITEM_OPTIONS } from "~/lib/game-data";

export const searchParams = {
  searchSet: parseAsString,
  searchPiece: parseAsString,
  searchOptions: parseAsArrayOf(parseAsStringEnum(Object.keys(ITEM_OPTIONS))),
};

export const loadSearchParams = createLoader(searchParams);
