import { useState } from "react";

export const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <input type="checkbox" onClick={handleCheckboxChange} />
      <button type="button" disabled={isChecked}>
        Confirm Order
      </button>
    </div>
  );
};
