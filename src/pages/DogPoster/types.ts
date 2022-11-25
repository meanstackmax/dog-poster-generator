type TRow = Record<string, Record<"breed" | "subBreed" | "count", string>>;
type TUpdateRowArgs = {
  id: string;
  count?: string;
  breed?: string;
  subBreed?: string;
};
type TImages = {
  breed: string[];
  subBreed: string[];
};

export type { TRow, TUpdateRowArgs, TImages };
