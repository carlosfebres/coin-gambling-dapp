import { RootState } from "../utils";

export function getIsCreateGameDialogOpen(state: RootState) {
  return state.dialogs.createGameDialogOpen;
}

export function getAlert(state: RootState) {
  return state.dialogs.alert;
}
