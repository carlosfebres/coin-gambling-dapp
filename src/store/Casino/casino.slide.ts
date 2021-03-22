import { createSlice } from "@reduxjs/toolkit";
import { casinoInitialState } from "./casino.model";

const casinoSlide = createSlice({
  name: "casino",
  initialState: casinoInitialState,
  reducers: {},
});

const { reducer } = casinoSlide;
export { reducer as casinoReducer };
