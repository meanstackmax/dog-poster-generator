import { FC, useContext } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { DogContext } from "../../pages/DogPoster/context";

export const ImagesGrid: FC = () => {
  const context = useContext(DogContext);
  const images = context?.images;
  const breedImages = images?.breed as string[];
  const subBreedImages = images?.subBreed as string[];

  return (
    <ImageList
      sx={{ width: "auto", height: "auto" }}
      gap={16}
      variant="quilted"
      cols={4}
      rowHeight={360}
    >
      {[...breedImages, ...subBreedImages].map((i) => (
        <ImageListItem key={i}>
          <img
            src={`${i}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${i}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
