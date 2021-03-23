import { Middleware } from "redux";
import {
  createGambler,
  fetchAddress,
  fetchGamblerFromCasino,
} from "./gambler.slide";
import { RootState } from "../utils";
import { getUserAddress } from "./gambler.selector";

export const gamblerMiddleware: Middleware = (store) => {
  return (next) => {
    return async (action) => {
      await next(action);

      if (action.type === fetchAddress.fulfilled.type) {
        const state = store.getState() as RootState;
        store.dispatch(
          fetchGamblerFromCasino(getUserAddress(state) as string) as any
        );
      }
    };
  };
};
