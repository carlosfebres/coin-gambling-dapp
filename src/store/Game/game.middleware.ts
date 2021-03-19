import { Middleware } from "redux";

export const gamesMiddleware: Middleware = () => {
  return (next) => {
    return async (action) => {
      await next(action);
    };
  };
};
