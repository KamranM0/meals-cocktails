import { Radio, Row, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import FoodContainer from "../features/home/FoodContainer";
import { useState } from "react";
import { useGetFiltrationItemsQuery } from "../features/api/mealApiSlice";
import FiltrationItems from "../features/home/FiltrationItems";
import { refineObjToArray } from "../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import DetailedFiltrationContainer from "../features/home/DetailedFiltrationContainer";
import RandomMeal from "../features/home/RandomMeal";
import ErrorPage from "./ErrorPage";
const categoriesObj = { key: "1", label: "Category" };

const Home = () => {
  const [selectedCategoryItemKey, setSelectedCategoryItemKey] = useState("1");
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.slice(1, location.pathname.length);

  const {
    data: categoryItemsArray,
    error: categoryItemsError,
    isLoading: categoryItemsIsLoading,
  } = useGetFiltrationItemsQuery({
    filtrationChoice: categoriesObj,
    type: type,
  });
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (page) => setCurrentPage(page);

  const refinedCategoryItemsArray = refineObjToArray(
    type,
    categoriesObj?.label,
    categoryItemsArray
  );

  const selectedCategoryItemLabel =
    refinedCategoryItemsArray.length === 0
      ? ""
      : refinedCategoryItemsArray.find(
          (el) => Number(el.key) === Number(selectedCategoryItemKey)
        )?.value;

  const [chosenFiltrationOptions, setChosenFiltrationOptions] = useState({
    Category: selectedCategoryItemLabel,
  });
  const handleChangeType = (e) => {
    setSelectedCategoryItemKey("1");

    navigate(`/${e.target.value}`);
  };
  if (categoryItemsError) return <ErrorPage />;

  return categoryItemsIsLoading ? (
    <Spin />
  ) : (
    <Space size={"large"} direction="vertical" style={{ width: "100%" }}>
      <Title level={3}>Type</Title>
      <Row>
        <Radio.Group size="large" value={type} onChange={handleChangeType}>
          <Radio.Button value={"meals"}>Meals</Radio.Button>
          <Radio.Button value={"cocktails"}>Cocktails</Radio.Button>
        </Radio.Group>
      </Row>

      <FiltrationItems
        setCurrentPage={setCurrentPage}
        refinedFiltrationItemsArray={refinedCategoryItemsArray}
        selectedFiltrationItemsKey={selectedCategoryItemKey}
        categoryItemLabel={selectedCategoryItemLabel}
        chosenFiltrationOptions={chosenFiltrationOptions}
        setChosenFiltrationOptions={setChosenFiltrationOptions}
        setSelectedFiltrationItemsKey={setSelectedCategoryItemKey}
      />
      <DetailedFiltrationContainer
        chosenFiltrationOptions={chosenFiltrationOptions}
        setChosenFiltrationOptions={setChosenFiltrationOptions}
        type={type}
        categoryItemLabel={selectedCategoryItemLabel}
      ></DetailedFiltrationContainer>
      <Title level={3}>Food</Title>
      <FoodContainer
        chosenFiltrationOptions={chosenFiltrationOptions}
        type={type}
        filtrationType={selectedCategoryItemLabel}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
      <RandomMeal />
    </Space>
  );
};

export default Home;
