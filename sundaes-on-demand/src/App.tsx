import { Container } from "react-bootstrap";

import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { SummaryForm } from "./pages/summary/SummaryForm";

export const App = () => {
  return (
    <Container>
      <OrderDetailsProvider>
        <SummaryForm />
      </OrderDetailsProvider>
    </Container>
  );
};
