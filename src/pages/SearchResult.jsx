import { Button, Col, Row } from "antd";
import WrappedCard from "../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import {
  useGetCocktailsByQueryQuery,
  useGetMealsByQueryQuery,
} from "../features/api/mealApiSlice";
function getType(foodObj) {
  if (foodObj.idMeal) {
    return "meals";
  } else if (foodObj.idDrink) {
    return "cocktails";
  }
}
function SearchResult({ query }) {
  const {
    data: mealData,
    error: mealError,
    isLoading: mealIsLoading,
  } = useGetMealsByQueryQuery(query);
  const {
    data: cocktailData,
    error: cocktailError,
    isLoading: cocktailIsLoading,
  } = useGetCocktailsByQueryQuery(query);
  let resultArray = [];

  if (!cocktailIsLoading && !mealIsLoading) {
    if (cocktailData.drinks === null && mealData.meals === null) {
      resultArray = [];
    } else if (cocktailData.drinks === null) {
      resultArray = [...mealData.meals];
    } else if (mealData.meals === null) {
      resultArray = [...cocktailData.drinks];
    } else {
      resultArray = [...mealData.meals, ...cocktailData.drinks];
    }
  } else {
    resultArray = [];
  }

  return (
    <>
      <Row
        justify={"left"}
        gutter={20}
        style={{ padding: "0px 40px", marginTop: "30px" }}
      >
        {resultArray.map((el) => {
          const type = getType(el);
          return (
            <Col
              key={el.idMeal || el.idDrink}
              span={6}
              style={{ marginBottom: "20px" }}
            >
              <WrappedCard
                type={type}
                idFood={el.idDrink || el.idMeal}
                cover={el.strMealThumb || el.strDrinkThumb}
              >
                <Title level={5}>{el.strMeal || el.strDrink}</Title>
              </WrappedCard>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default SearchResult;
