import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

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

  const optionItemsElements = optionItems.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return <Row>{optionItemsElements}</Row>;
};
