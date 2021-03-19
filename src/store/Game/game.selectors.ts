import { RootState } from "../utils";

export function getGameAddresses(state: RootState) {
  return state.game.gameAddresses;
}

export function getGameByAddress(address: string) {
  return (state: RootState) => {
    return state.game.games[address];
  };
}

export function getIsCreatingGame(state: RootState) {
  return state.game.creatingGame;
}
