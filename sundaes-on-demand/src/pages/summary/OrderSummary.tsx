import { useOrderDetailsContext } from "../../contexts/OrderDetails";
import { SummaryForm } from "./SummaryForm";

type PropsType = {
  setOrderPhase: (orderPhase: "inProgress" | "review" | "completed") => void;
};

export const OrderSummary = ({ setOrderPhase }: PropsType) => {
  const { totals, orderDetails } = useOrderDetailsContext();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  // only display toppings if the toppings total is nonzero
  const hasToppings = totals.toppings !== "$0.00";
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};
