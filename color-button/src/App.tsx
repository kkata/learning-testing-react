import { useState } from "react";

export const replaceCamelWithSpaces = (colorName: string) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

export const App = () => {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  const handleClick = () => {
    setButtonColor(newButtonColor);
  };

  const handleCheck = () => {
    setButtonDisabled(!buttonDisabled);
  };

  return (
    <div>
      <button
        style={{ backgroundColor: buttonDisabled ? "gray" : buttonColor }}
        onClick={handleClick}
        disabled={buttonDisabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        onClick={handleCheck}
        defaultChecked={buttonDisabled}
        id="disable-button-checkbox"
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
};
