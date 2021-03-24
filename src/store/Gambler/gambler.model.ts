export type Gambler = {
  name: string;
  address: string;
  gamesWon: number;
  games: string[];
  balance: string;
};

export type GamblerReducerState = {
  needsRegister: boolean;
  withdrawProcess: boolean;
  withdrawing: boolean;
  creatingGambler: boolean;
  userAddress?: string;
  gambler?: Gambler;
};

export const GAMBLER_REDUCER_INITIAL_STATE: GamblerReducerState = {
  needsRegister: false,
  withdrawProcess: false,
  withdrawing: false,
  creatingGambler: false,
};
