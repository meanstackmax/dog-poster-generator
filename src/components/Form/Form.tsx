import { useContext } from "react";
import type { FC } from "react";

import { Box } from "@mui/material";

import { useGetAllBreedsQuery } from "api/dog/hooks";

import { DogContext } from "pages/DogPoster/context";
import { FormRow } from "components/FormRow";

export const Form: FC = () => {
  const { data: allBreedsData } = useGetAllBreedsQuery();
  const allBreeds = allBreedsData?.message;
  const breeds = allBreeds
    ? Object.entries(allBreeds).map(([breed]) => breed)
    : [];
  const context = useContext(DogContext);
  const rowsObject = context?.rows;
  const rows = rowsObject ? Object.entries(rowsObject) : [];

  return (
    <>
      {rows.map(([id, row], idx) => (
        <Box key={id} my={3}>
          <FormRow
            data={{ id, ...row }}
            breeds={breeds}
            isLast={idx === rows.length - 1}
          />
        </Box>
      ))}
    </>
  );
};
