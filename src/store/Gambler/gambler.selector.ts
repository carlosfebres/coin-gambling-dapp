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
