import { fireEvent, render, screen } from "@testing-library/react";

import { SummaryForm } from "../SummaryForm";

test("Checkbox is unchecked and button is disabled by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("Checking checkbox enables button and Unchecking checkbox again disables button", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
