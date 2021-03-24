import { Game } from "./game.models";
import { RootState } from "../utils";

export function filterGamblerGames(state: RootState, game: Game): boolean {
  const gamblerAddress = state.gambler.gambler?.address;
  if (!gamblerAddress) return false;
  return isGamblerAPlayer(game, gamblerAddress);
}

export function isGamblerAPlayer(game: Game, gamblerAddress: string) {
  return game.player1 === gamblerAddress || game.player2 === gamblerAddress;
}
