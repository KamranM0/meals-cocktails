import { useLocation, useParams } from "react-router-dom";
import { useGetFoodDetailsByIdQuery } from "../features/api/mealApiSlice";
import { Col, Image, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { getIngredients, getProportions } from "../utils/helpers";

function MealPage() {
  const { type, id } = useParams();
  console.log(type);
  let thumbKey;
  let nameKey;
  let arrayKey;
  let secondaryHeaderKey;
  const { data, error, isLoading } = useGetFoodDetailsByIdQuery({ id, type });
  if (type === "meals") {
    thumbKey = "strMealThumb";
    nameKey = "strMeal";
    arrayKey = "meals";
    secondaryHeaderKey = "strArea";
  } else if (type === "cocktails") {
    thumbKey = "strDrinkThumb";
    nameKey = "strDrink";
    arrayKey = "drinks";
    secondaryHeaderKey = "strAlcoholic";
  }
  const foodObj = data?.[arrayKey][0];
  const ingredients = !isLoading ? getIngredients(foodObj) : [];
  const measures = !isLoading ? getProportions(foodObj) : [];
  console.log(measures);
  console.log(ingredients);
  console.log(foodObj);
  return (
    <Row
      style={{
        height: "100%",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "23px",
      }}
    >
      {isLoading ? (
        <div></div>
      ) : (
        <Row
          align="start"
          style={{
            width: "100%",
            background: "orange",
            height: "242px",
            borderRadius: "23px",
            borderBottomRightRadius: "0px",
          }}
        >
          <Col span={4}>
            <Image
              src={foodObj[thumbKey]}
              style={{ borderTopLeftRadius: "20px" }}
            />
          </Col>
          <Col span={20}>
            <Space style={{ margin: "20px" }} direction="vertical">
              <Title
                level={1}
                style={{ padding: "0px", fontSize: "50px", margin: "0px" }}
              >
                {foodObj[nameKey]}
              </Title>
              <Paragraph
                style={{
                  fontSize: "24px",

                  fontWeight: "400",
                  padding: "0px",
                  marginBottom: "0px",
                }}
              >
                {foodObj["strCategory"]}
              </Paragraph>
              <Paragraph
                style={{
                  color: "#0000006a",
                  fontSize: "22px",
                  margin: "0px",
                }}
              >
                {foodObj[secondaryHeaderKey]}
              </Paragraph>
              <Paragraph style={{ fontSize: "18px", margin: "0px" }}>
                {foodObj["strTags"]}
              </Paragraph>
            </Space>
          </Col>
          <Row justify={"start"} style={{ width: "100%", height: "100%" }}>
            <Col span={16} style={{ background: "red" }}>
              <Title level={2} style={{ margin: "0px", marginLeft: "20px" }}>
                Ingredients
              </Title>
              <Col
                span={8}
                style={{ background: "green", height: "100%" }}
              ></Col>
            </Col>
            <Col span={8} style={{ background: "blue" }}>
              <Title level={2}>Instructions</Title>
            </Col>
          </Row>
        </Row>
      )}
    </Row>
  );
}

export default MealPage;
