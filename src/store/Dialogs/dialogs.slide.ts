import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { dialogsReducerInitialState } from "./dialogs.model";

export const dialogsSlide = createSlice({
  name: "dialogs",
  initialState: dialogsReducerInitialState,
  reducers: {
    setCreateGameDialog(state, action: PayloadAction<boolean>) {
      state.createGameDialogOpen = action.payload;
    },
  },
});

const { actions, reducer } = dialogsSlide;
export const { setCreateGameDialog } = actions;
export {reducer as dialogsReducer}
