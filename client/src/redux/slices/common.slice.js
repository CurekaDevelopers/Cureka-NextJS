import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const commonSliceName = "common";

const commonSlice = createSlice({
  name: commonSliceName,
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const commonReducer = commonSlice.reducer;

export const { setCategories } = commonSlice.actions;
export default commonReducer;
