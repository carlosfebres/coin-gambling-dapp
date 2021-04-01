import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert, DIALOGS_REDUCER_INITIAL_STATE } from "./dialogs.model";

export const dialogsSlice = createSlice({
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

const { actions, reducer } = dialogsSlice;
export const { setCreateGameDialog, showAlert, hideAlert } = actions;
export { reducer as dialogsReducer };
