import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetByBreedPayload,
  GetBySubBreedPayload,
  AllResponse,
  Response,
} from "./types";

export const dogApi = createApi({
  reducerPath: "dogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dog.ceo/api/" }),
  endpoints: (builder) => ({
    getAllBreeds: builder.query<AllResponse, void>({
      query: () => `breeds/list/all`,
    }),
    getAllSubBreeds: builder.query<Response, { breed: string }>({
      query: ({ breed }) => `breed/${breed}/list`,
    }),
    getRandomImagesByBreed: builder.query<Response, GetByBreedPayload>({
      query: ({ breed, count }) => `breed/${breed}/images/random/${count}`,
    }),
    getRandomImagesBySubBreed: builder.query<Response, GetBySubBreedPayload>({
      query: ({ breed, subBreed, count }) =>
        `breed/${breed}/${subBreed}/images/random/${count}`,
    }),
  }),
});
