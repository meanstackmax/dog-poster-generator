import { useCallback, useContext, useEffect } from "react";
import type { FC, ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Icon,
} from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";

import { useLazyGetAllSubBreedsQuery } from "api/dog/hooks";

import { DogContext } from "pages/DogPoster/context";

export type TProps = {
  data: Record<"id" | "breed" | "subBreed" | "count", string>;
  breeds: string[];
  isLast: boolean;
};

export const FormRow: FC<TProps> = ({ data, breeds, isLast }) => {
  const [triggerSubBreeds, { data: allSubBreedsData }] =
    useLazyGetAllSubBreedsQuery();
  const allSubBreeds = allSubBreedsData?.message;
  const subBreeds = allSubBreeds
    ? Object.entries(allSubBreeds).map(([, v]) => v)
    : [];
  const context = useContext(DogContext);
  const onUpdateRow = context?.onUpdateRow;
  const onAddRow = context?.onAddRow;

  useEffect(() => {
    const { breed } = data;

    if (breed) {
      void triggerSubBreeds({ breed });
    }
  }, [data]);

  const onSelect = useCallback(
    (type: "breed" | "subBreed") => (e: SelectChangeEvent) => {
      if (!onUpdateRow) return;

      const { id } = data;
      let breed = "";
      let subBreed = "";

      if (type === "breed") {
        breed = e.target.value;
      } else {
        subBreed = e.target.value;
      }

      onUpdateRow({ id, breed, subBreed });
    },
    [data, onUpdateRow]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!onUpdateRow) return;

      const { id } = data;
      const value = Number(e.target.value);
      let count = isNaN(value) ? 0 : value;

      if (count < 0) {
        count = 0;
      }

      if (count > 50) {
        count = 50;
      }

      onUpdateRow({
        id,
        count: count === 0 ? "" : count.toString(),
      });
    },
    [data, onUpdateRow]
  );

  const onAdd = useCallback(() => {
    if (!onAddRow) return;

    void onAddRow();
  }, [onAddRow]);

  return (
    <Grid container spacing={3} alignItems="center" width="100%">
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="breed-select-label">Breed</InputLabel>
          <Select
            labelId="breed-select-label"
            id="breed-simple-select"
            data-testid="breedSelect"
            value={data.breed}
            label="Breed"
            onChange={onSelect("breed")}
          >
            {breeds.map((breed, idx) => (
              <MenuItem key={`${breed}-${idx}`} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="sub-breed-select-label">Sub-breed</InputLabel>
          <Select
            labelId="sub-breed-select-label"
            id="sub-breed-simple-select"
            data-testid="subBreedSelect"
            value={data.subBreed}
            label="Sub-breed"
            disabled={!data.breed}
            onChange={onSelect("subBreed")}
          >
            {subBreeds.map((subBreed, idx) => (
              <MenuItem key={`${subBreed}-${idx}`} value={subBreed}>
                {subBreed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          type="number"
          id="number-of-images"
          label="Number of images"
          variant="outlined"
          InputProps={{
            inputProps: { min: 1, max: 50, "data-testid": "count" },
          }}
          value={data.count}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs="auto">
        {isLast && (
          <IconButton aria-label="add" onClick={onAdd} sx={{ padding: 0 }}>
            <AddCircleOutlined color="secondary" />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};
