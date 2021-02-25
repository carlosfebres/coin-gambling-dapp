import {RootState} from "../utils";
import {Tournament} from "./tournaments.model";

export function getAllTournaments(state: RootState): Tournament[] {
  return state.tournaments.tournaments;
}
