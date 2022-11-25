import theme from "./theme";
import DogPoster from "pages/DogPoster";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import store from "store";

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <DogPoster />
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
