import { Button, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import WrappedCard from "../../ui/WrappedCard";
import Title from "antd/es/skeleton/Title";

function RandomRecommendations({ mockObj }) {
  return (
    <Row justify={"space-around"} align={"middle"}>
      <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
        <RandomRecommendationItem mockObj={mockObj} />
      </Col>
      <Col
        span={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            background: "var(--colorPrimary)",
            width: "100px",
            height: "100px",
            borderRadius: 20,
          }}
        >
          +
        </Button>
      </Col>
      <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
        <RandomRecommendationItem mockObj={mockObj} />
      </Col>
    </Row>
  );
}
function RandomRecommendationItem({ mockObj }) {
  return (
    <WrappedCard style={{ width: 400 }} cover={mockObj.cocktail.strDrinkThumb}>
      <Meta
        title={
          <Title level={3} style={{ margin: 0 }}>
            {mockObj.cocktail.strDrink}
          </Title>
        }
        description={mockObj.cocktail.strCategory}
      ></Meta>
      <Button
        style={{
          position: "absolute",
          right: 0,
          height: "60px",
          top: "calc(50% - 30px)",
          margin: "0 5px",
          width: 100,
          borderRadius: 100,
          background: "var(--colorPrimary)",
          color: "white",
        }}
      >
        Detailed
      </Button>
    </WrappedCard>
  );
}

export default RandomRecommendations;
