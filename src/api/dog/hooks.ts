import { dogApi } from "./dogApi";

export const {
  useGetAllBreedsQuery,
  useLazyGetAllSubBreedsQuery,
  useLazyGetRandomImagesByBreedQuery,
  useLazyGetRandomImagesBySubBreedQuery,
} = dogApi;
