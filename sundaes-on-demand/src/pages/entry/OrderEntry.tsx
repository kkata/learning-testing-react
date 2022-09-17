import { useOrderDetailsContext } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = () => {
  const { totals } = useOrderDetailsContext();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options options="scoops" />
      <Options options="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
    </div>
  );
};
