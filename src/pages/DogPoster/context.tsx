import { createContext } from "react";

import type { TRow, TUpdateRowArgs, TImages } from "./types";

type TContextValue = {
  rows: TRow;
  images: TImages;
  onAddRow: () => void;
  onUpdateRow: (args: TUpdateRowArgs) => void;
} | null;

const DogContext = createContext<TContextValue>(null);

export type { TContextValue };
export { DogContext };
