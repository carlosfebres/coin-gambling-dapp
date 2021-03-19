export enum GameStatus {
  NoStarted = "GAME_NO_STARTED",
  Started = "GAME_STARTED",
  Ended = "GAME_ENDED",
}

export type Game = {
  address: string;
  amount: string;
  minAmount: string;
  starter: string;
  winner: string;
  finished: boolean;
};

export type GameReducerState = {
  betAmount: string;
  creatingGame: boolean;
  gameAddresses: string[];
  games: Record<string, Game>;
};

export const gameReducerInitialState: GameReducerState = {
  betAmount: "0",
  creatingGame: false,
  gameAddresses: [],
  games: {},
};
