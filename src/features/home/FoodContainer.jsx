import { Col, Pagination, Row, Spin } from "antd";
import WrappedCard from "../../ui/WrappedCard";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import {
  useGetFiltrationItemsQuery,
  useGetFoodsByFiltrationQuery,
  useGetMealsByCategoryQuery,
} from "../api/mealApiSlice";
const PAGE_SIZE = 12;
function FoodContainer({
  filtrationChoiceLabel,
  filtrationItemLabel,
  filtrationType,
  type,
  currentPage,
  handlePagination,
}) {
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const { data, error, isLoading } = useGetFoodsByFiltrationQuery(
    { type, filtrationChoiceLabel, filtrationItemLabel },
    {
      skip: filtrationItemLabel === "" || !filtrationChoiceLabel,
    }
  );
  let thumbKey;
  let valueKey;
  let arrayKey;
  let idKey;
  if (type === "meals") {
    thumbKey = "strMealThumb";
    valueKey = "strMeal";
    arrayKey = "meals";
    idKey = "idMeal";
  } else {
    thumbKey = "strDrinkThumb";
    valueKey = "strDrink";
    arrayKey = "drinks";
    idKey = "idDrink";
  }
  const paginatedItems =
    data?.[arrayKey]?.slice(startIndex, startIndex + PAGE_SIZE) || [];
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
            total={data?.[arrayKey]?.length}
            style={{ marginBottom: "20px" }}
          />
          <Row justify={"left"} gutter={40} style={{ padding: "0px 120px" }}>
            {paginatedItems.map((el) => (
              <Col span={6} style={{ marginBottom: "40px" }}>
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
          <Pagination
            current={currentPage}
            onChange={handlePagination}
            pageSize={PAGE_SIZE}
            align="center"
            total={data?.[arrayKey]?.length}
          />
        </>
      )}
    </>
  );
}

export default FoodContainer;
