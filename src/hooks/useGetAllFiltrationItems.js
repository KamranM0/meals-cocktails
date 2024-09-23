import { useState } from "react";
import { useGetFiltrationItemsQuery } from "../features/api/mealApiSlice";
import { refineObjToArray } from "../utils/helpers";

const filtrationChoicesForMeals = [
  { key: "2", label: "Area" },
  { key: "3", label: "Ingredients" },
];
const filtrationChoicesForCocktails = [
  { key: "2", label: "Glass" },
  { key: "3", label: "Alcoholic_Filter" },
  { key: "4", label: "Ingredients" },
];
const PAGE_SIZE = 30;
export const useGetAllFiltrationItems = (type) => {
  //meals services
  const {
    data: areaItems,
    isLoading: areaIsLoading,
    error: areaError,
  } = useGetFiltrationItemsQuery(
    {
      filtrationChoice: filtrationChoicesForMeals[0],
      type,
    },
    { skip: type === "cocktails" }
  );
  const {
    data: mealIngredientsItems,
    isLoading: mealIngredientsIsLoading,
    error: mealIngredientsError,
  } = useGetFiltrationItemsQuery(
    {
      filtrationChoice: filtrationChoicesForMeals[1],
      type,
    },
    { skip: type === "cocktails" }
  );
  //cocktails services
  const {
    data: glassItems,
    isLoading: glassIsLoading,
    error: glassError,
  } = useGetFiltrationItemsQuery(
    {
      filtrationChoice: filtrationChoicesForCocktails[0],
      type,
    },
    { skip: type === "meals" }
  );
  const {
    data: alcoholicItems,
    isLoading: alcoholicIsLoading,
    error: alcoholicError,
  } = useGetFiltrationItemsQuery(
    {
      filtrationChoice: filtrationChoicesForCocktails[1],
      type,
    },
    { skip: type === "meals" }
  );

  const {
    data: cocktailIngredientsItems,
    isLoading: cocktailIngredientsIsLoading,
    error: cocktailIngredientsError,
  } = useGetFiltrationItemsQuery(
    {
      filtrationChoice: filtrationChoicesForCocktails[2],
      type,
    },
    { skip: type === "meals" }
  );
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (page) => setCurrentPage(page);
  let paginatedIngredients;
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  let filtrationChoicesObj;
  const isLoading =
    type === "meals"
      ? areaIsLoading || mealIngredientsIsLoading
      : cocktailIngredientsIsLoading || glassIsLoading || alcoholicIsLoading;

  if (!isLoading)
    if (type === "meals") {
      const refinedAreaItems = refineObjToArray(type, "Area", areaItems);
      const refinedMealIngredientsItems = refineObjToArray(
        type,
        "Ingredients",
        mealIngredientsItems
      );
      paginatedIngredients = refinedMealIngredientsItems?.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );
      filtrationChoicesObj = {
        Area: refinedAreaItems,
        Ingredients: paginatedIngredients,
      };
    } else if (type === "cocktails") {
      const refinedGlassItems = refineObjToArray(type, "Glass", glassItems);
      const refinedAlcoholicItems = refineObjToArray(
        type,
        "Alcoholic filter",
        alcoholicItems
      );
      const refinedCocktailIngredientsItems = refineObjToArray(
        type,
        "Ingredients",
        cocktailIngredientsItems
      );
      paginatedIngredients = refinedCocktailIngredientsItems?.slice(
        startIndex,
        startIndex + PAGE_SIZE
      );
      filtrationChoicesObj = {
        Glass: refinedGlassItems,
        Alcoholic_Filter: refinedAlcoholicItems,
        Ingredients: paginatedIngredients,
      };
    }
  const isFiltrationLoading =
    areaIsLoading ||
    cocktailIngredientsIsLoading ||
    alcoholicIsLoading ||
    glassIsLoading ||
    mealIngredientsIsLoading;
  const isErrorOccurred =
    areaError ||
    cocktailIngredientsError ||
    alcoholicError ||
    glassError ||
    mealIngredientsError;
  const totalNumOfIngredients =
    type === "meals"
      ? mealIngredientsItems?.meals?.length
      : cocktailIngredientsItems?.drinks?.length;
  const choicesLabelsArray =
    type === "meals"
      ? filtrationChoicesForMeals.map((el) => el.label)
      : filtrationChoicesForCocktails.map((el) => el.label);
  return {
    filtrationChoicesObj,
    currentPage,
    handlePagination,
    choicesLabelsArray,
    totalNumOfIngredients,
    isErrorOccurred,
    isFiltrationLoading,
  };
};
