import {Action, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TournamentsReducerState } from "./tournaments.model";
import { signer } from "../../etherium";

const tournamentInitialState: TournamentsReducerState = {
  playerAddress: "",
};

export const fetchPlayerAddress = createAsyncThunk(
  "tournaments/fetchPlayerAddress",
  () => {
    return signer.getAddress();
  }
);

const tournamentsSlide = createSlice({
  name: "tournaments",
  initialState: tournamentInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPlayerAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.playerAddress = action.payload;
      }
    );
  },
});

const { reducer } = tournamentsSlide;
export { reducer as tournamentsReducer };
