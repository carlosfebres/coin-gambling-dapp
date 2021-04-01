import { getEthereum } from "../../ethereum";

export type Gambler = {
  name: string;
  address: string;
  gamesWon: string;
  games: string[];
  balance: string;
};

export type GamblerReducerState = {
  loading: boolean;
  metamaskInstalled: boolean;
  walletConnected: boolean;
  needsRegister: boolean;
  withdrawProcess: boolean;
  withdrawing: boolean;
  creatingGambler: boolean;
  userAddress?: string;
  gambler?: Gambler;
};

export const GAMBLER_REDUCER_INITIAL_STATE: GamblerReducerState = {
  loading: false,
  metamaskInstalled: !!getEthereum(),
  walletConnected: false,
  needsRegister: false,
  withdrawProcess: false,
  withdrawing: false,
  creatingGambler: false,
};
