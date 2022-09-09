import { useState } from "react";

export const App = () => {
  const [buttonColor, setButtonColor] = useState("red");
  const newButtonColor = buttonColor === "red" ? "blue" : "red";
  const handleClick = () => {
    setButtonColor(newButtonColor);
  };
  return (
    <div>
      <button style={{ backgroundColor: buttonColor }} onClick={handleClick}>
        Change to {newButtonColor}
      </button>
      <input type="checkbox" />
    </div>
  );
};
