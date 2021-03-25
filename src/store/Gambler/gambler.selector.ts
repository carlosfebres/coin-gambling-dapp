import { RootState } from "../utils";

export function getNeedsRegister(state: RootState) {
  return state.gambler.needsRegister;
}

export function getGamblerAddress(state: RootState) {
  return state.gambler.gambler?.address;
}

export function getUserAddress(state: RootState) {
  return state.gambler.userAddress;
}

export function getCreatingGambler(state: RootState) {
  return state.gambler.creatingGambler;
}

export function getGambler(state: RootState) {
  return state.gambler.gambler;
}

export function getIsWithdrawing(state: RootState) {
  return state.gambler.withdrawing;
}

export function getWithdrawProcess(state: RootState) {
  return state.gambler.withdrawProcess;
}

export function getWalletConnected(state: RootState) {
  return state.gambler.walletConnected;
}

export function getGamblerLoading(state: RootState) {
  return state.gambler.loading;
}
