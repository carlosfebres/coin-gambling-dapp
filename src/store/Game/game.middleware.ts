import {Middleware} from "redux";

export const gamesMiddleware: Middleware = (store) => {
  return (next) => {
    return async (action) => {
      await next(action);
    };
  };
};
