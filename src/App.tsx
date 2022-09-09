import { useState } from "react";

export const App = () => {
  const [buttonColor, setButtonColor] = useState("red");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  const handleClick = () => {
    setButtonColor(newButtonColor);
  };

  const handleCheck = () => {
    setButtonDisabled(!buttonDisabled);
  };

  return (
    <div>
      <button
        style={{ backgroundColor: buttonColor }}
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
