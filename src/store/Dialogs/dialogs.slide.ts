import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert, dialogsReducerInitialState } from "./dialogs.model";

export const dialogsSlide = createSlice({
  name: "dialogs",
  initialState: dialogsReducerInitialState,
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
