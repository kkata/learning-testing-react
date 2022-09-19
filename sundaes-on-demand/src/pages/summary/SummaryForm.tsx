import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

type PropsType = {
  setOrderPhase: (orderPhase: "inProgress" | "review" | "completed") => void;
};

export const SummaryForm = ({ setOrderPhase }: PropsType) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase("completed");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};
