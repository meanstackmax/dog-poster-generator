import { useCallback, useState, useMemo, useEffect } from "react";
import type { FC } from "react";
import uuid from "react-uuid";
import type { TRow, TUpdateRowArgs } from "./types";
import { Button, Box } from "@mui/material";
import { Form } from "components/Form";
import { Modal } from "components/Modal";
import { DogContext } from "./context";
import {
  useLazyGetRandomImagesByBreedQuery,
  useLazyGetRandomImagesBySubBreedQuery,
} from "api/dog/hooks";

export const DogPoster: FC = () => {
  const [triggerBreedImages, { data: breedImageData }] =
    useLazyGetRandomImagesByBreedQuery();
  const [triggerSubBreedImages, { data: subBreedImageData }] =
    useLazyGetRandomImagesBySubBreedQuery();
  const [open, setOpen] = useState(false);

  const initialRows = useMemo(
    () => ({
      [uuid()]: { breed: "", subBreed: "", count: "" },
    }),
    []
  );
  const [images, setImages] = useState<{ breed: string[]; subBreed: string[] }>(
    { breed: [], subBreed: [] }
  );
  const [rows, setRows] = useState<TRow>(initialRows);

  const onAddRow = useCallback(() => {
    setRows({ ...rows, [uuid()]: { breed: "", subBreed: "", count: "" } });
  }, [rows]);

  const onUpdateRow = useCallback(
    (args: TUpdateRowArgs) => {
      const { id, breed, subBreed, count } = args;
      const row = rows[id];

      if (typeof count !== "undefined") {
        row.count = count;
      }

      if (breed) {
        row.breed = breed;
      }

      if (subBreed) {
        row.subBreed = subBreed;
      }

      setRows({ ...rows, [id]: row });
    },
    [rows]
  );

  const isSet = Object.values(rows).some(
    ({ breed, count }) => !!breed && !!count
  );
  const queries = Object.values(rows).map(({ breed, subBreed, count }) => [
    breed,
    subBreed,
    count,
  ]);

  const handleGenerate = useCallback(() => {
    setOpen(true);

    if (!isSet) return;

    queries.forEach((q: string[]) => {
      if (q[0] && !q[1] && q[2]) {
        triggerBreedImages({ breed: q[0], count: q[2] });
      }

      if (q[0] && q[1] && q[2]) {
        triggerSubBreedImages({
          breed: q[0],
          subBreed: q[1],
          count: q[2],
        });
      }
    });
  }, [isSet, queries]);

  const reset = useCallback(() => {
    setRows({
      [uuid()]: { breed: "", subBreed: "", count: "" },
    });
    setImages({ breed: [], subBreed: [] });
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    setImages({
      breed: [
        ...images.breed,
        ...(breedImageData?.message || ([] as string[])),
      ],
      subBreed: [
        ...images.subBreed,
        ...(subBreedImageData?.message || ([] as string[])),
      ],
    });
  }, [breedImageData, subBreedImageData]);

  const value = {
    rows,
    onAddRow,
    onUpdateRow,
    images,
  };

  return (
    <DogContext.Provider value={value}>
      <Form />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleGenerate}
          disabled={!isSet}
        >
          Generate
        </Button>
        <Modal open={open} handleClose={handleClose} />
      </Box>
    </DogContext.Provider>
  );
};
