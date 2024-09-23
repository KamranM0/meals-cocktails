import { Col, Pagination, Row, Spin } from "antd";
import WrappedCard from "../../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import { useGetFoodsByMultipleFiltration } from "../../hooks/useGetFoodsByMultipleFiltration";
import ErrorPage from "../../pages/ErrorPage";
const PAGE_SIZE = 12;
const FoodContainer = ({
  type,
  currentPage,
  handlePagination,
  chosenFiltrationOptions,
}) => {
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const {
    filteredFoodArray: filteredFood,
    isLoading,
    isFoodFiltrationErrorOccurred,
  } = useGetFoodsByMultipleFiltration(type, chosenFiltrationOptions);
  const data = filteredFood?.length !== 0 ? filteredFood : [];

  let thumbKey = type === "meals" ? "strMealThumb" : "strDrinkThumb";
  let valueKey = type === "meals" ? "strMeal" : "strDrink";
  let idKey = type === "meals" ? "idMeal" : "idDrink";

  let paginatedItems;
  if (!data) {
    paginatedItems = [];
  } else {
    paginatedItems = data?.slice(startIndex, startIndex + PAGE_SIZE);
  }
  if (isFoodFiltrationErrorOccurred) return <ErrorPage />;
  return (
    <>
      {isLoading && <Spin tip="Loading meals..." size="large" />}
      {data && (
        <>
          <Pagination
            current={currentPage}
            onChange={handlePagination}
            pageSize={PAGE_SIZE}
            align="center"
            total={data?.length}
            style={{ marginBottom: "20px" }}
          />
          (
          <Row justify={"left"} gutter={40} style={{ padding: "0px 120px" }}>
            {paginatedItems?.map((el) => (
              <Col
                key={el.idMeal || el.idDrink}
                span={6}
                style={{ marginBottom: "40px" }}
              >
                <WrappedCard
                  cover={el[thumbKey]}
                  idFood={el[idKey]}
                  type={type}
                >
                  <Title level={5}>{el[valueKey]}</Title>
                </WrappedCard>
              </Col>
            ))}
          </Row>
          )
          <Pagination
            current={currentPage}
            onChange={handlePagination}
            pageSize={PAGE_SIZE}
            align="center"
            total={data?.length}
          />
        </>
      )}
    </>
  );
};

export default FoodContainer;
