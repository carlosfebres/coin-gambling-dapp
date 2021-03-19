export enum GameStatus {
  NoStarted = "GAME_NO_STARTED",
  Started = "GAME_STARTED",
  Ended = "GAME_ENDED",
}

export type Game = {
  address: string;
  finished: boolean;
  withdrew: boolean;
  gambler: string;
  winner: string;
  bitAmount: string;
};

export type GameReducerState = {
  creatingGame: boolean;
  withdrawing: boolean;
  gameAddresses: string[];
  games: Record<string, Game>;
};

export const gameReducerInitialState: GameReducerState = {
  creatingGame: false,
  withdrawing: false,
  gameAddresses: [],
  games: {},
};
