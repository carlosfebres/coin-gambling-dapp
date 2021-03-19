import { Player } from "../Player/player.model";
import { Game } from "../Game/game.models";

export type Tournament = {
  address: string;
  id: string;
  name: string;
  players: Player[];
  games: Game[];
};

export type TournamentsReducerState = {
  tournamentAddresses: string[],
  tournaments: Record<string, Tournament>;
};
