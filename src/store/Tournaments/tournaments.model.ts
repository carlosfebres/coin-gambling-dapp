import {Player} from "../Player/player.model";
import {Game} from "../Game/game.models";

export type Tournament = {
  id: string;
  name: string;
  players: Player[],
  games: Game[],
};

export type TournamentsReducerState = {
  tournaments: Tournament[],
};
