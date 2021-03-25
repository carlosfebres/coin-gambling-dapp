import { Middleware } from "redux";
import { createGambler } from "../Gambler/gambler.slide";
import { showAlert } from "./dialogs.slide";
import { AlertType } from "./dialogs.model";
import { createGame } from "../Game/game.slide";

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
