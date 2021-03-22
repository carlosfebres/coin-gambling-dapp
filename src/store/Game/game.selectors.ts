import { RootState } from "../utils";
import { Game } from "./game.models";

export function getGameAddresses(state: RootState) {
  return state.game.gameAddresses;
}

export function getGameByAddress(address: string) {
  return (state: RootState): Game | undefined => {
    return state.game.games[address];
  };
}

export function getIsCreatingGame(state: RootState) {
  return state.game.creatingGame;
}
