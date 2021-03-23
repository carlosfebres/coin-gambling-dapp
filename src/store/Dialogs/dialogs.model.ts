export enum AlertType {
  success,
  warning,
  error,
}

export type Alert = {
  type: AlertType;
  title?: string;
  message: string;
};

type DialogReducerState = {
  createGameDialogOpen: boolean;
  alert?: Alert;
};

export const DIALOGS_REDUCER_INITIAL_STATE: DialogReducerState = {
  createGameDialogOpen: false,
};
