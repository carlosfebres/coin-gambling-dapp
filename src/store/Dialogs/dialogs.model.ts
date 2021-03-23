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

export const dialogsReducerInitialState: DialogReducerState = {
  createGameDialogOpen: false,
  alert: {
    type: AlertType.error,
    title: 'Title',
    message: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
  }
};
