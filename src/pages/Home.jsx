import { Image, Radio, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import FoodContainer from "../features/home/FoodContainer";
import { useEffect, useState } from "react";
import FiltrationChoiceField from "../features/home/FiltrationChoiceField";
import { useGetFiltrationItemsQuery } from "../features/api/mealApiSlice";
import FiltrationItems from "../features/home/FiltrationItems";
import { refineObjToArray } from "../utils/helpers";
import SearchResult from "./SearchResult";
import Paragraph from "antd/es/typography/Paragraph";
import { Footer } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";

const filtrationChoicesForMeals = [
  { key: "1", label: "Category" },
  { key: "2", label: "Area" },
  { key: "3", label: "Random" },
];
const filtrationChoicesForCocktails = [
  { key: "1", label: "Category" },
  { key: "2", label: "Glass" },
  { key: "3", label: "Alcoholic filter" },
  { key: "4", label: "Random" },
];

function Home({ isSearching, query }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (page) => setCurrentPage(page);
  const location = useLocation();
  const type = location.pathname.slice(1, location.pathname.length);
  const [selectedFiltrationChoiceKey, setSelectedFiltrationChoiceKey] =
    useState("1");
  const [selectedFiltrationItemsKey, setSelectedFiltrationItemsKey] =
    useState("1");
  const navigate = useNavigate();
  const selectedFiltrationChoiceObj =
    type === "meals"
      ? filtrationChoicesForMeals.find(
          (el) => el.key === selectedFiltrationChoiceKey
        )
      : filtrationChoicesForCocktails.find(
          (el) => el.key === selectedFiltrationChoiceKey
        );
  const {
    data: filtrationItemsArray,
    error,
    isLoading,
  } = useGetFiltrationItemsQuery({
    filtrationChoice: selectedFiltrationChoiceObj,

    type: type,
  });

  useEffect(() => {
    setSelectedFiltrationItemsKey("1");
  }, [selectedFiltrationChoiceKey, type]);

  const refinedFiltrationItemsArray = refineObjToArray(
    type,
    selectedFiltrationChoiceObj?.label,
    filtrationItemsArray
  );

  const selectedFiltrationItemLabel =
    refinedFiltrationItemsArray.length === 0
      ? ""
      : refinedFiltrationItemsArray.find(
          (el) => Number(el.key) === Number(selectedFiltrationItemsKey)
        )?.value;

  return (
    <Space size={"large"} direction="vertical" style={{ width: "100%" }}>
      <Title level={3}>Type</Title>
      <Row>
        <Radio.Group
          size="large"
          value={type}
          onChange={(e) => {
            setSelectedFiltrationChoiceKey("1");
            navigate(`/${e.target.value}`);
          }}
        >
          <Radio.Button value={"meals"}>Meals</Radio.Button>
          <Radio.Button value={"cocktails"}>Cocktails</Radio.Button>
        </Radio.Group>
      </Row>
      <FiltrationChoiceField
        items={
          type === "meals"
            ? filtrationChoicesForMeals
            : filtrationChoicesForCocktails
        }
        selectedFiltrationChoiceKey={selectedFiltrationChoiceKey}
        setSelectedFiltrationChoiceKey={setSelectedFiltrationChoiceKey}
      />
      <FiltrationItems
        setCurrentPage={setCurrentPage}
        refinedFiltrationItemsArray={refinedFiltrationItemsArray}
        selectedFiltrationItemsKey={selectedFiltrationItemsKey}
        setSelectedFiltrationItemsKey={setSelectedFiltrationItemsKey}
      />

      <Title level={3}>Food</Title>
      <FoodContainer
        type={type}
        filtrationItemLabel={selectedFiltrationItemLabel}
        filtrationType={selectedFiltrationItemLabel}
        filtrationChoiceLabel={selectedFiltrationChoiceObj.label}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
      <Footer
        style={{
          position: "absolute",
          width: "100%",
          height: "50px",
          left: "0px",
          marginTop: "20px",
          background: "var(--colorPrimary)",
          padding: "10px",
        }}
      >
        <Paragraph color="#fff" style={{ color: "white", fontSize: "24px" }}>
          For delivery <span style={{ fontWeight: 700 }}>+994509735633</span>
        </Paragraph>
      </Footer>
    </Space>
  );
}

export default Home;
