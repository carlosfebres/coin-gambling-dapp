import {Player} from "../Player/player.model";

export enum GameStatus {
  NoStarted = 'GAME_NO_STARTED',
  Started = 'GAME_STARTED',
  Ended = 'GAME_ENDED'
}

export type Game = {
  players: Player[]
};

export type GameReducerState = {
  state: GameStatus;
};

export const gameReducerInitialState: GameReducerState = {
  state: GameStatus.NoStarted,
};
