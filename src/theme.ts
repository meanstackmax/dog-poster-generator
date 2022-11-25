import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e5e0f0",
      main: "#8771bc",
      dark: "#3b2c5e",
    },
    secondary: {
      main: "#594d5b",
    },
  },
  typography: {
    fontFamily: '"Lato, serif"',
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32, 64],
});

export default theme;
