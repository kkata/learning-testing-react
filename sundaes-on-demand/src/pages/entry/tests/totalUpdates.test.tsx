import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../test-utils/testing-library-utils";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options options="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options options="toppings" />);

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // update cherries toppings to 1 and check the subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // update hot fudge toppings to 2 and check the subtotal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // uncheck cherries and check the subtotal
  await userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // check that the grand total starts out at $0.00
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.click(cherriesCheckbox);

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
