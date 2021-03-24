import { Middleware } from "redux";
import {
  createGambler,
  fetchAddress,
  fetchGambler,
  fetchGamblerFromCasino,
} from "./gambler.slide";
import { RootState } from "../utils";
import { getGamblerAddress, getUserAddress } from "./gambler.selector";
import { fetchGameByAddress } from "../Game/game.slide";
import { getGameByAddress } from "../Game/game.selectors";
import { Game } from "../Game/game.models";
import { isGamblerWinner } from "../../shared/utils";

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
      if (action.type === fetchGameByAddress.fulfilled.type) {
        const state = store.getState() as RootState;
        const gamblerAddress = getGamblerAddress(state);
        const game = action.payload as Game;
        if (gamblerAddress && isGamblerWinner(game, gamblerAddress)) {
          store.dispatch(fetchGambler(gamblerAddress) as any);
        }
      }
    };
  };
};
