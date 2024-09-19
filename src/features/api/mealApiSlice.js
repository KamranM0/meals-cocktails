import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const MEALS_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const COCKTAILS_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";
export const mealApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    // getCategories: builder.query({ query: (category) => `categories.php` }),
    // getAreas: builder.query({ query: () => `/list.php?a=` }),
    getFiltrationItems: builder.query({
      query: ({ filtrationChoice, type }) => {
        if (type === "meals") {
          switch (filtrationChoice.label) {
            case "Category":
              return MEALS_BASE_URL + "categories.php";
            case "Area":
              return MEALS_BASE_URL + "list.php?a=";
            default:
              throw new Error("invalid filtration");
          }
        } else if (type === "cocktails") {
          switch (filtrationChoice.label) {
            case "Category":
              return COCKTAILS_BASE_URL + "list.php?c=list";
            case "Glass":
              return COCKTAILS_BASE_URL + "list.php?g=list";
            case "Alcoholic filter":
              return COCKTAILS_BASE_URL + "list.php?a=list";
            default:
              throw new Error("invalid filtration");
          }
        } else {
          throw new Error("invalid type");
        }
      },
    }),
    getMealsByCategory: builder.query({
      query: (category) => {
        return MEALS_BASE_URL + `filter.php?c=${category}`;
      },
    }),
    getFoodsByFiltration: builder.query({
      query: ({ type, filtrationChoiceLabel, filtrationItemLabel }) => {
        const dashedFiltrationChoiceLabel = filtrationChoiceLabel.replace(
          " ",
          "_"
        );
        const dashedFiltrationItemLabel = filtrationItemLabel.replace(" ", "_");
        if (!dashedFiltrationChoiceLabel || !dashedFiltrationItemLabel) {
          throw new Error("Filtration choice or item label is missing");
        }
        if (type === "meals") {
          switch (dashedFiltrationChoiceLabel) {
            case "Category":
              return (
                MEALS_BASE_URL + `filter.php?c=${dashedFiltrationItemLabel}`
              );
            case "Area":
              return (
                MEALS_BASE_URL + `filter.php?a=${dashedFiltrationItemLabel}`
              );
            default:
              throw new Error("invalid choice label");
          }
        } else if (type === "cocktails") {
          switch (dashedFiltrationChoiceLabel) {
            case "Category":
              return (
                COCKTAILS_BASE_URL + `filter.php?c=${dashedFiltrationItemLabel}`
              );
            case "Glass":
              return (
                COCKTAILS_BASE_URL + `filter.php?g=${dashedFiltrationItemLabel}`
              );
            case "Alcoholic_filter":
              return (
                COCKTAILS_BASE_URL + `filter.php?a=${dashedFiltrationItemLabel}`
              );
            default:
              throw new Error("err");
          }
        }
      },
    }),
    getMealsByQuery: builder.query({
      query: (query) => {
        return MEALS_BASE_URL + `search.php?s=${query}`;
      },
    }),
    getCocktailsByQuery: builder.query({
      query: (query) => COCKTAILS_BASE_URL + `search.php?s=${query}`,
    }),
    getFoodDetailsById: builder.query({
      query: ({ id, type }) => {
        console.log(type);
        if (type === "meals") {
          console.log("salam");
          return MEALS_BASE_URL + `lookup.php?i=${id}`;
        } else if ((type = "cocktails")) {
          return COCKTAILS_BASE_URL + `lookup.php?i=${id}`;
        }
      },
    }),
  }),
});
export const {
  useGetFiltrationItemsQuery,
  useGetMealsByCategoryQuery,
  useGetFoodsByFiltrationQuery,
  useGetMealsByQueryQuery,
  useGetCocktailsByQueryQuery,
  useGetFoodDetailsByIdQuery,
} = mealApiSlice;
