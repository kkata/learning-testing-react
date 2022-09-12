import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

import { IceCreamFlavorsType } from "../../types";
import { ScoopOption } from "./ScoopOption";

type PropsType = {
  options: "scoops" | "toppings";
};

export const Options = ({ options }: PropsType) => {
  const [optionItems, setOptionItems] = useState<IceCreamFlavorsType[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${options}`)
      .then((response) => {
        // console.log(response.data);
        setOptionItems(response.data);
      })
      .catch((error) => console.log(error));
  }, [options]);

  // TODO: replace null with optionItems when you're ready
  const ItemComponent = options === "scoops" ? ScoopOption : null;
  if (ItemComponent === null) return <>No ItemComponent</>;

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
