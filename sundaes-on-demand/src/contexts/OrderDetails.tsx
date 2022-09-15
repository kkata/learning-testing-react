import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { PRICE_PER_ITEM } from "../constants/index";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderDetailsContext = createContext<
  | {
      totals: {
        scoops: string;
        toppings: string;
        grandTotal: string;
      };
      orderDetails: {
        scoops: Map<string, number>;
        toppings: Map<string, number>;
      };
      updateItemCount(
        itemName: string,
        newItemCount: string,
        options: "scoops" | "toppings"
      ): void;
    }
  | undefined
>(undefined);

// create custom hook to check whether we're inside a provider
export const useOrderDetailsContext = () => {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

export const OrderDetailsProvider = (props: { children: ReactNode }) => {
  const initialOptionsCountState = {
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  };

  const zeroCurrency = formatCurrency(0);

  const [optionsCounts, setOptionsCounts] = useState(initialOptionsCountState);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (
    options: "scoops" | "toppings",
    optionCounts: { [key: string]: Map<string, number> }
  ) => {
    let optionCount = 0;
    optionCounts[options].forEach((value) => {
      optionCount += value;
    });
    return optionCount * PRICE_PER_ITEM[options];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionsCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      options: "scoops" | "toppings"
    ) {
      const newOptionsCounts = { ...optionsCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionsCounts[options];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    }

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    // return [{ ...optionsCounts, totals }, updateItemCount];
    return {
      totals,
      orderDetails: optionsCounts,

      updateItemCount,
    };
  }, [optionsCounts, totals]);

  return (
    <OrderDetailsContext.Provider value={value}>
      {props.children}
    </OrderDetailsContext.Provider>
  );
};
