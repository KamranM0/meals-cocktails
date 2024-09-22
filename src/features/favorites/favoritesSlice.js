import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoritesList: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavs: (state, action) => {
      if (
        !state.favoritesList.find((el) => el.idFood === action.payload.idFood)
      ) {
        state.favoritesList.push(action.payload);
      }
    },
    //payload id
    removeFromFavs: (state, action) => {
      state.favoritesList = state.favoritesList.filter((el) => {
        return el.idFood !== action.payload;
      });
    },
  },
});
export const { addToFavs, removeFromFavs } = favoritesSlice.actions;
export default favoritesSlice.reducer;
