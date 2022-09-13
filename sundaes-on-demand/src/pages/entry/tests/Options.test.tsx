import { render, screen } from "@testing-library/react";

import { Options } from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options options="scoops" />);

  const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
  render(<Options options="toppings" />);

  const toppingImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
