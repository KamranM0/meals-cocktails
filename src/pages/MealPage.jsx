import { useParams } from "react-router-dom";
import { useGetFoodDetailsByIdQuery } from "../features/api/mealApiSlice";
import { Col, Image, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { getIngredients, getProportions } from "../utils/helpers";

function MealPage() {
  const { type, id } = useParams();
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

  return (
    <Row
      style={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "23px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "vertical",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <Row
            align="start"
            style={{
              width: "100%",
              background: "orange",
              flexGrow: "1",
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
          </Row>
          <Row justify={"start"} style={{ width: "100%" }}>
            <Col
              span={12}
              style={{
                background: "",
                border: "1px dashed black",
                borderTop: "0px",
              }}
            >
              <Title
                level={2}
                style={{ margin: "0px", marginLeft: "20px", marginTop: "10px" }}
              >
                Ingredients
              </Title>
              <Row
                style={{
                  background: "",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <Col style={{ background: "" }} span={6}>
                  {ingredients.map((el) => (
                    <Paragraph strong={true}>{el}</Paragraph>
                  ))}
                </Col>
                <Col span={1}>
                  {measures.map((el) => (
                    <Paragraph>X</Paragraph>
                  ))}
                </Col>
                <Col style={{ background: "" }} span={5}>
                  {measures.map((el) => (
                    <Paragraph strong>{el}</Paragraph>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col
              span={12}
              style={{
                background: "",

                border: "1px dashed black",
                borderTop: "0px",
                borderLeft: "0px",
              }}
            >
              <Title
                style={{ margin: "0px", marginLeft: "20px", marginTop: "10px" }}
                level={2}
              >
                Instructions
              </Title>
              <Paragraph
                style={{
                  padding: "20px",
                  paddingTop: "0px",
                  marginTop: "10px",
                }}
              >
                {foodObj.strInstructions}
              </Paragraph>
            </Col>
          </Row>
        </>
      )}
    </Row>
  );
}

export default MealPage;
