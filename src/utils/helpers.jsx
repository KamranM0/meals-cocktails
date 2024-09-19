import { Image } from "antd";
import Title from "antd/es/typography/Title";

export function refineObjToArray(
  type,
  filtrationChoiceLabel,
  filtrationItemsObj
) {
  let thumbKey;
  let valueKey;
  let idKey;
  switch (filtrationChoiceLabel) {
    case undefined:
      return null;
    case "Category":
      if (type === "meals") {
        thumbKey = null;
        valueKey = "strCategory";
        idKey = "idCategory";
      } else {
        thumbKey = null;
        valueKey = "strCategory";
        idKey = null;
      }

      break;
    case "Area":
      thumbKey = null;
      valueKey = "strArea";
      idKey = null;
      break;
    case "Glass":
      thumbKey = null;
      valueKey = "strGlass";
      idKey = null;
      break;
    case "Alcoholic filter":
      thumbKey = null;
      valueKey = "strAlcoholic";
      idKey = null;
      break;
    default:
      throw new Error("invalid choice label");
  }
  const refinedFiltrationItemsArray =
    filtrationItemsObj === undefined
      ? []
      : Object.entries(filtrationItemsObj)[0][1].map((el, ind) => {
          return {
            label: (
              <div style={{ minWidth: "100px", background: "transparent" }}>
                {thumbKey && <Image preview={false} src={el[thumbKey]}></Image>}
                <Title style={{ textAlign: "center" }} level={5}>
                  {el[valueKey]}
                </Title>
              </div>
            ),
            value: el[valueKey],
            key: idKey ? el[idKey] : ind + 1,
            style: { padding: "10px" },
          };
        });
  return refinedFiltrationItemsArray;
}
export function getIngredients(el) {
  const ingredientsKeys = Object.keys(el)
    .filter(
      (key) => key.includes("Ingredient") && el[key] !== "" && el[key] !== null
    )
    .map((item) => {
      return el[item] !== "" ? el[item] : null;
    });
  return ingredientsKeys;
}
export function getProportions(el) {
  const measuresKeys = Object.keys(el)
    .filter(
      (key) => key.includes("Measure") && el[key] !== "" && el[key] !== null
    )
    .map((item) => {
      return el[item] !== "" ? el[item] : null;
    });

  return measuresKeys;
}
