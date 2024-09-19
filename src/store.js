import { configureStore } from "@reduxjs/toolkit";
import { mealApiSlice } from "./features/api/mealApiSlice";

export const store = configureStore({
  reducer: {
    [mealApiSlice.reducerPath]: mealApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mealApiSlice.middleware),
});
