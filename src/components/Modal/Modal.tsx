import { forwardRef } from "react";
import type { FC } from "react";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImagesGrid } from "components/ImagesGrid";
import { TransitionProps } from "@mui/material/transitions";

type TProps = {
  open: boolean;
  handleClose: () => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal: FC<TProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      fullScreen
      data-testid="imagesDialog"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar color="secondary" sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ImagesGrid />
    </Dialog>
  );
};
