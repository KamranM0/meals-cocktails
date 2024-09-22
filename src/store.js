import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mealApiSlice } from "./features/api/mealApiSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites"],
};
const rootReducer = combineReducers({
  [mealApiSlice.reducerPath]: mealApiSlice.reducer,
  favorites: favoritesReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(mealApiSlice.middleware),
});
export const persistor = persistStore(store);
