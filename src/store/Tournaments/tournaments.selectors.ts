import {RootState} from "../utils";

export function getAllTournaments(state: RootState) {
  return state.tournaments.playerAddress;
}
