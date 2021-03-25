import { RootState } from "../utils";
import { Game } from "./game.models";
import { filterGamblerGames } from "./game.utils";

export function getGameAddresses(state: RootState) {
  return state.game.gameAddresses;
}

export function getGames(state: RootState): Game[] {
  return Object.values(state.game.games);
}

export function getGamblerGames(state: RootState): Game[] {
  const games = getGames(state);
  const gamblerAddress = state.gambler.gambler?.address;
  if (!gamblerAddress) return [];
  return games.filter((game) => filterGamblerGames(state, game));
}

export function getOpenGames(state: RootState): Game[] {
  const games = getGames(state);
  const openGames = games.filter((game) => !game.finished);
  return openGames.filter((game) => !filterGamblerGames(state, game));
}

export function getFinishedGames(state: RootState): Game[] {
  const games = getGames(state);
  const finishedGames = games.filter((game) => game.finished);
  return finishedGames.filter((game) => !filterGamblerGames(state, game));
}

export function getGameByAddress(address: string) {
  return (state: RootState): Game | undefined => {
    return state.game.games[address];
  };
}

export function getIsCreatingGame(state: RootState) {
  return state.game.creatingGame;
}

export function getGamesLoading(state: RootState) {
  return state.game.loading;
}
