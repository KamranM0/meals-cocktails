import { useGetFoodsByFiltrationQuery } from "../features/api/mealApiSlice";
import { getIntersectionById } from "../utils/helpers";

export const useGetFoodsByMultipleFiltration = (
  type,
  chosenFiltrationOptions
) => {
  const isMealType = type === "meals";
  //meals
  console.log(chosenFiltrationOptions);
  const {
    data: categoryFilteredMeals,
    isLoading: categoryFilteredMealsIsLoading,
    error: categoryFilteredMealsError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Category",
      filtrationItemLabel: chosenFiltrationOptions?.Category,
    },
    {
      skip:
        !isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Category,
    }
  );
  const {
    data: areaFilteredMeals,
    isLoading: areaFilteredIsLoading,
    error: areaFilteredError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Area",
      filtrationItemLabel: chosenFiltrationOptions?.Area,
    },
    {
      skip:
        !isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Area,
    }
  );
  const {
    data: ingredientFilteredMeals,
    isLoading: ingredientFilteredMealsIsLoading,
    error: ingredientFilteredMealsError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Ingredients",
      filtrationItemLabel: chosenFiltrationOptions?.Ingredients,
    },
    {
      skip:
        !isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Ingredients,
    }
  );
  const {
    data: categoryFilteredDrinks,
    isLoading: categoryFilteredDrinksIsLoading,
    error: categoryFilteredDrinksError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Category",
      filtrationItemLabel: chosenFiltrationOptions?.Category,
    },
    {
      skip:
        isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Category,
    }
  );
  const {
    data: glassFilteredDrinks,
    isLoading: glassFilteredIsLoading,
    error: glassFilteredError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Glass",
      filtrationItemLabel: chosenFiltrationOptions?.Glass,
    },
    {
      skip:
        isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Glass,
    }
  );
  const {
    data: alcoholicFilteredDrinks,
    isLoading: alcoholicFilteredIsLoading,
    error: alcoholicFilteredError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Alcoholic_Filter",
      filtrationItemLabel: chosenFiltrationOptions?.Alcoholic_Filter,
    },
    {
      skip:
        isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Alcoholic_Filter,
    }
  );
  const {
    data: ingredientFilteredDrinks,
    isLoading: ingredientFilteredIsLoading,
    error: ingredientFilteredError,
  } = useGetFoodsByFiltrationQuery(
    {
      type,
      filtrationChoiceLabel: "Ingredients",
      filtrationItemLabel: chosenFiltrationOptions?.Ingredients,
    },
    {
      skip:
        isMealType ||
        !chosenFiltrationOptions ||
        !chosenFiltrationOptions?.Ingredients,
    }
  );
  const isLoading = isMealType
    ? categoryFilteredMealsIsLoading ||
      areaFilteredIsLoading ||
      ingredientFilteredMealsIsLoading
    : categoryFilteredDrinksIsLoading ||
      glassFilteredIsLoading ||
      alcoholicFilteredIsLoading ||
      ingredientFilteredIsLoading;
  const isFoodFiltrationErrorOccurred = isMealType
    ? categoryFilteredMealsError ||
      areaFilteredError ||
      ingredientFilteredMealsError
    : categoryFilteredDrinksError ||
      glassFilteredError ||
      alcoholicFilteredError ||
      ingredientFilteredError;
  const resultCategoryFilteredMeals =
    chosenFiltrationOptions?.Category && isMealType && !isLoading
      ? categoryFilteredMeals?.meals
      : null;
  const resultAreaFilteredMeals =
    chosenFiltrationOptions?.Area && isMealType && !isLoading
      ? areaFilteredMeals?.meals
      : null;
  const resultIngredientFilteredMeals =
    chosenFiltrationOptions?.Ingredients && isMealType && !isLoading
      ? ingredientFilteredMeals?.meals
      : null;
  const resultGlassFilteredDrinks =
    chosenFiltrationOptions?.Glass && !isMealType && !isLoading
      ? glassFilteredDrinks?.drinks
      : null;
  const resultCategoryFilteredDrinks =
    chosenFiltrationOptions?.Category && !isMealType && !isLoading
      ? categoryFilteredDrinks?.drinks
      : null;
  const resultAlcoholicFilteredDrinks =
    chosenFiltrationOptions?.Alcoholic_Filter && !isMealType && !isLoading
      ? alcoholicFilteredDrinks?.drinks
      : null;
  const resultIngredientFilteredDrinks =
    chosenFiltrationOptions?.Ingredients && !isMealType && !isLoading
      ? ingredientFilteredDrinks?.drinks
      : null;

  const filteredDrinksArray = getIntersectionById(
    type,
    resultAlcoholicFilteredDrinks,
    resultCategoryFilteredDrinks,
    resultIngredientFilteredDrinks,
    resultGlassFilteredDrinks
  );
  const filteredMealsArray = getIntersectionById(
    type,
    resultCategoryFilteredMeals,
    resultAreaFilteredMeals,
    resultIngredientFilteredMeals
  );
  const filteredFoodArray = isMealType
    ? filteredMealsArray
    : filteredDrinksArray;

  return { filteredFoodArray, isLoading, isFoodFiltrationErrorOccurred };
};
