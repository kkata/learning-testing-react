import Col from "react-bootstrap/Col";

type PropsType = {
  name: string;
  imagePath: string;
};

export const ScoopOption = ({ name, imagePath }: PropsType) => {
  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};
