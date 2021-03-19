import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../Player/player.model";
import { Tournament, TournamentsReducerState } from "./tournaments.model";

const tournamentInitialState: TournamentsReducerState = {
  tournamentAddresses: [],
  tournaments: {},
};

const tournamentsSlide = createSlice({
  name: "tournaments",
  initialState: tournamentInitialState,
  reducers: {
    createTournament: {
      reducer(state, action: PayloadAction<Tournament>) {
        const tournament = action.payload;
        state.tournaments[tournament.address] = tournament;
      },
      prepare: (tournamentName: Tournament["name"]) => {
        const tournament: Tournament = {
          address: "123",
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
