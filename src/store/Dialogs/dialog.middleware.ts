import { Middleware } from "redux";
import { createGambler } from "../Gambler/gambler.slice";
import { showAlert } from "./dialogs.slice";
import { AlertType } from "./dialogs.model";
import { createGame } from "../Game/game.slice";

export const dialogMiddleware: Middleware = (store) => {
  return (next) => {
    return async (action) => {
      await next(action);

      if (action.type === createGame.rejected.type) {
        store.dispatch(
          showAlert({
            type: AlertType.error,
            title: "Creating Game - Error",
            message: action.error.message,
          })
        );
      }
      if (action.type === createGambler.rejected.type) {
        store.dispatch(
          showAlert({
            type: AlertType.error,
            title: "Registering Error",
            message: "Unexpected error occurred while registering",
          })
        );
      }
    };
  };
};
