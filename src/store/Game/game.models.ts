export type Game = {
  address: string;
  finished: boolean;
  player1: string;
  player2: string;
  winner: string;
  betAmount: string;
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
