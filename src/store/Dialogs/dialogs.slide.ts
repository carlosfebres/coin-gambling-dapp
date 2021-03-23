import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Alert,
  AlertType,
  DIALOGS_REDUCER_INITIAL_STATE,
} from "./dialogs.model";
import { createGambler } from "../Gambler/gambler.slide";

export const dialogsSlide = createSlice({
  name: "dialogs",
  initialState: DIALOGS_REDUCER_INITIAL_STATE,
  reducers: {
    setCreateGameDialog(state, action: PayloadAction<boolean>) {
      state.createGameDialogOpen = action.payload;
    },
    showAlert(state, action: PayloadAction<Alert>) {
      state.alert = action.payload;
    },
    hideAlert(state) {
      state.alert = undefined;
    },
  },
});

const { actions, reducer } = dialogsSlide;
export const { setCreateGameDialog, showAlert, hideAlert } = actions;
export { reducer as dialogsReducer };
