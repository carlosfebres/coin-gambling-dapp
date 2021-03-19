import {RootState} from "../utils";

export const getIsCreateGameDialogOpen = (state: RootState) => {
  return state.dialogs.createGameDialogOpen;
};
