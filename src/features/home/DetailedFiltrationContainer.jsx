import { Collapse, Pagination, Radio } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect } from "react";
import { useGetAllFiltrationItems } from "../../hooks/useGetAllFiltrationItems";

const PAGE_SIZE = 30;
function DetailedFiltrationContainer({
  categoryItemLabel,
  type,
  chosenFiltrationOptions,
  setChosenFiltrationOptions,
}) {
  const {
    filtrationChoicesObj,
    currentPage,
    handlePagination,
    totalNumOfIngredients,
    choicesLabelsArray,
  } = useGetAllFiltrationItems(type);

  useEffect(
    () =>
      setChosenFiltrationOptions({
        Category: categoryItemLabel,
      }),
    [type, setChosenFiltrationOptions, categoryItemLabel]
  );
  return (
    <Collapse
      items={[
        {
          key: "1",
          label: "Detailed filtration",
          children: filtrationChoicesObj
            ? choicesLabelsArray.map((el) => (
                <React.Fragment key={el}>
                  <Paragraph>{el}</Paragraph>
                  <Radio.Group
                    buttonStyle="solid"
                    value={chosenFiltrationOptions[el]}
                  >
                    {filtrationChoicesObj !== undefined
                      ? filtrationChoicesObj?.[el].map((item) => {
                          return (
                            <Radio.Button
                              key={item.key}
                              style={{
                                margin: "5px",
                                border: "1px solid black",
                                outline: "none",
                                borderRadius: "10px",
                                borderLeft: "0px",
                              }}
                              onClick={() => {
                                if (chosenFiltrationOptions[el] !== item.value)
                                  setChosenFiltrationOptions({
                                    ...chosenFiltrationOptions,
                                    [el]: item.value,
                                  });
                                else
                                  setChosenFiltrationOptions({
                                    ...chosenFiltrationOptions,
                                    [el]: null,
                                  });
                              }}
                              value={item.value}
                            >
                              {item.value}
                            </Radio.Button>
                          );
                        })
                      : null}
                    {el === "Ingredients" && (
                      <Pagination
                        current={currentPage}
                        onChange={handlePagination}
                        pageSize={PAGE_SIZE}
                        align="center"
                        size="small"
                        total={totalNumOfIngredients}
                        style={{ marginBottom: "20px" }}
                      />
                    )}
                  </Radio.Group>
                </React.Fragment>
              ))
            : null,
        },
      ]}
    ></Collapse>
  );
}

export default DetailedFiltrationContainer;
