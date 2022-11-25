import { render, fireEvent } from "@testing-library/react";
import { Provider as StoreProvider } from "react-redux";
import store from "store";
import { FormRow } from "./FormRow";

const mock: any = {
  data: [],
  breeds: [],
  isLast: false,
};

test("It should render breed Select correctly", () => {
  const { getByTestId } = render(
    <StoreProvider store={store}>
      <FormRow {...mock} />
    </StoreProvider>
  );
  const select = getByTestId("breedSelect") as HTMLSelectElement;
  expect(select).toBeVisible();
});

test("It should render Subbreed Select correctly", () => {
  const { getByTestId } = render(
    <StoreProvider store={store}>
      <FormRow {...mock} />
    </StoreProvider>
  );
  const select = getByTestId("subBreedSelect") as HTMLSelectElement;
  expect(select).toBeVisible();
});

test("It should render Subbreed Select correctly", () => {
  const { getByTestId } = render(
    <StoreProvider store={store}>
      <FormRow {...mock} />
    </StoreProvider>
  );
  const input = getByTestId("count") as HTMLInputElement;
  fireEvent.change(input, { target: { value: 5 } });
  expect(input.value).toBe("5");
});
