import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { PRICE_PER_ITEM } from "../../constants/index";
import { useOrderDetailsContext } from "../../contexts/OrderDetails";
import { IceCreamFlavorsType } from "../../types";
import { AlertBanner } from "../common/AlertBanner";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";

type PropsType = {
  options: "scoops" | "toppings";
};

export const Options = ({ options }: PropsType) => {
  const [optionItems, setOptionItems] = useState<IceCreamFlavorsType[]>([]);
  const [isError, setIsError] = useState(false);
  const { totals, updateItemCount } = useOrderDetailsContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${options}`)
      .then((response) => {
        setOptionItems(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [options]);

  if (isError) {
    return <AlertBanner message={""} variant={"danger"} />;
  }

  const ItemComponent = options === "scoops" ? ScoopOption : ToppingOption;
  const title = options[0].toUpperCase() + options.slice(1).toLowerCase();

  const optionItemsElements = optionItems.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName: string, newItemCount: string) =>
          updateItemCount(itemName, newItemCount, options)
        }
      />
    );
  });

  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[options]} each</p>
      <p>
        {title} total: {totals[options]}
      </p>
      <Row>{optionItemsElements}</Row>
    </>
  );
};
