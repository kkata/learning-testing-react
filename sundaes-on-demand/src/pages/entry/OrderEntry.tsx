import { useOrderDetailsContext } from "../../contexts/OrderDetails";
import { Options } from "./Options";

type PropsType = {
  setOrderPhase: (orderPhase: "inProgress" | "review" | "completed") => void;
};

export const OrderEntry = ({ setOrderPhase }: PropsType) => {
  const { totals } = useOrderDetailsContext();
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options options="scoops" />
      <Options options="toppings" />
      <h2>Grand total: {totals.grandTotal}</h2>
      <button onClick={() => setOrderPhase("review")}>Order Sundae!</button>
    </div>
  );
};
