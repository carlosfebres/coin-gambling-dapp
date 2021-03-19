import { createSlice } from "@reduxjs/toolkit";
import { dialogsReducerInitialState } from "./dialogs.model";

export const dialogsSlide = createSlice({
  name: "dialogs",
  initialState: dialogsReducerInitialState,
  reducers: {
    createGameDialogOpen(state) {
      state.createGameDialogOpen = true;
    },
    createGameDialogClose(state) {
      state.createGameDialogOpen = false;
    },
  },
});

const { actions, reducer } = dialogsSlide;
export const { createGameDialogClose, createGameDialogOpen } = actions;
export {reducer as dialogsReducer}
