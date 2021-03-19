import { Middleware } from "redux";
import { createGame, fetchGameAddresses } from "./game.slide";

export const gamesMiddleware: Middleware = (store) => {
  return (next) => {
    return async (action) => {
      await next(action);

      if (action.type === createGame.fulfilled.toString()) {
        store.dispatch(fetchGameAddresses() as any);
      }
    };
  };
};
