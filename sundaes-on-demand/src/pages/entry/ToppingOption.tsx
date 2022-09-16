import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";

type PropsType = {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: string) => void;
};

export const ToppingOption = ({
  name,
  imagePath,
  updateItemCount,
}: PropsType) => {
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type="checkbox"
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? "1" : "0");
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
};
