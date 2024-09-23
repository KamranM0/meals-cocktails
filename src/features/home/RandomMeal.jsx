import { Button, Col, Row } from "antd";
import WrappedCard from "../../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import { useGetRandomFoodQuery } from "../api/mealApiSlice";
import ErrorPage from "../../pages/ErrorPage";

const RandomMeal = () => {
  const {
    data: randomMeal,
    isLoading: randomMealIsLoading,
    error: randomMealError,
    refetch: refetchMeal,
  } = useGetRandomFoodQuery("meals");
  const {
    data: randomDrink,
    isLoading: randomDrinkIsLoading,
    error: randomDrinkError,
    refetch: refetchDrink,
  } = useGetRandomFoodQuery("cocktails");
  const randomDrinkObj = randomDrink?.drinks[0];
  const randomMealObj = randomMeal?.meals[0];
  const handleMealClick = () => {
    refetchMeal();
  };
  const handleDrinkClick = () => refetchDrink();
  const isErrorOccurred = randomDrinkError || randomMealError;
  const isLoading = randomDrinkIsLoading || randomMealIsLoading;
  if (isErrorOccurred) return <ErrorPage />;
  return (
    !isLoading && (
      <>
        <Row style={{ marginTop: "20px" }} align={"center"}>
          <Col
            span={9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button type="primary" onClick={handleMealClick}>
              Generate Random Meal
            </Button>
            <WrappedCard
              type="meals"
              style={{ width: "300px", marginTop: "10px" }}
              cover={randomMealObj?.strMealThumb}
              idFood={randomMealObj?.idMeal}
            >
              <Title level={4}>{randomMealObj?.strMeal}</Title>
            </WrappedCard>
          </Col>
          <Col
            span={9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button onClick={handleDrinkClick}>Generate Random Cocktail</Button>
            <WrappedCard
              type="cocktails"
              idFood={randomDrinkObj?.idDrink}
              style={{ width: "300px", marginTop: "10px" }}
              cover={randomDrinkObj?.strDrinkThumb}
            >
              <Title level={4}>{randomDrinkObj?.strDrink}</Title>
            </WrappedCard>
          </Col>
        </Row>
      </>
    )
  );
};

export default RandomMeal;
