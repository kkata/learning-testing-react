import { Alert } from "react-bootstrap";

type PropsType = {
  message: string;
  variant: "danger" | "warning" | "info";
};

export const AlertBanner = ({ message, variant }: PropsType) => {
  const alertMessage =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};
