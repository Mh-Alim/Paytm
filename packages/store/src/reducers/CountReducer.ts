import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    incrementCount: (state) => {
      return state + 1;
    },
    decrementCount: (state) => {
      return state - 1;
    },
  },
});

// this is for dispatch
export const { incrementCount, decrementCount } = countSlice.actions;

// this is for configureStore
export default countSlice.reducer;
