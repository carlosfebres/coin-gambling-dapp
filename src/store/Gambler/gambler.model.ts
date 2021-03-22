export type Gambler = {
  name: string;
  address: string;
  gamesWon: number;
  games: string[];
};

export type GamblerReducerState = {
  needsRegister: boolean;
  userAddress?: string;
  gambler?: Gambler;
};

export const GAMBLER_REDUCER_INITIAL_STATE: GamblerReducerState = {
  needsRegister: false,
};
