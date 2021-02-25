import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../Player/player.model";
import { Tournament, TournamentsReducerState } from "./tournaments.model";

const tournamentInitialState: TournamentsReducerState = {
  tournaments: [],
};

const tournamentsSlide = createSlice({
  name: "tournaments",
  initialState: tournamentInitialState,
  reducers: {
    createTournament: {
      reducer(state, action: PayloadAction<Tournament>) {
        state.tournaments.push(action.payload);
      },
      prepare: (tournamentName: Tournament["name"]) => {
        const tournament: Tournament = {
          id: new Date().getTime().toString(),
          name: tournamentName,
          players: [],
          games: [],
        };
        return { payload: tournament };
      },
    },
    addPlayer: {
      reducer(
        state,
        action: PayloadAction<{ tournament: Tournament; player: Player }>
      ) {
        const { tournament, player } = action.payload;
        tournament.players.push(player);
      },
      prepare: (tournament: Tournament, player: Player) => ({
        payload: { tournament, player },
      }),
    },
  },
});

const { actions, reducer } = tournamentsSlide;
export { reducer as tournamentsReducer };
export const { createTournament, addPlayer } = actions;
