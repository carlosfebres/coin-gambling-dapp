import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, gameReducerInitialState } from "./game.models";
import { getGameContract, tournament } from "../../etherium";
import { RootState } from "../utils";

export const fetchGameByAddress = createAsyncThunk<Game, string>(
  "tournaments/fetchGameByAddress",
  async (gameAddress) => {
    const game = getGameContract(gameAddress);
    console.log({ game, gameAddress });
    return {
      address: gameAddress,
      finished: await game.finished(),
      withdrew: await game.withdrew(),
      gambler: await game.gambler(),
      winner: await game.winner(),
      bitAmount: (await game.bitAmount()).toString(),
    };
  }
);

export const fetchGameAddresses = createAsyncThunk(
  "tournaments/fetchGameAddresses",
  () => {
    return tournament.getGames();
  }
);

export const createGame = createAsyncThunk(
  "tournaments/createGame",
  async (betAmount: string) => {
    const transaction = await tournament.createGame({ value: betAmount });
    await transaction.wait();
  }
);

export const withdrawGameFunds = createAsyncThunk(
  "tournaments/withdrawGameFunds",
  async (gameAddress: string, store) => {
    const game = getGameContract(gameAddress);
    const transaction = await game.withdraw();
    await transaction.wait();
    store.dispatch(fetchGameByAddress(gameAddress));
  }
);

export const startGamePlay = createAsyncThunk(
  "tournaments/startGamePlay",
  async (gameAddress: string, store) => {
    const state = store.getState() as RootState;
    const game = getGameContract(gameAddress);
    const transaction = await game.play({
      value: state.game.games[gameAddress].bitAmount,
    });
    await transaction.wait();
    store.dispatch(fetchGameByAddress(gameAddress));
  }
);

export const gameSlide = createSlice({
  name: "game",
  initialState: gameReducerInitialState,
  reducers: {
    stopCreatingGame(state) {
      state.creatingGame = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGameByAddress.fulfilled, (state, action) => {
      const game = action.payload;
      state.games[game.address] = game;
      if (!state.gameAddresses.includes(game.address)) {
        state.gameAddresses.push(game.address);
      }
    });
    builder.addCase(createGame.pending, (state) => {
      state.creatingGame = true;
    });
    builder.addCase(createGame.rejected, (state) => {
      state.creatingGame = false;
    });
    builder.addCase(createGame.fulfilled, (state) => {
      state.creatingGame = false;
    });
    builder.addCase(
      fetchGameAddresses.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        console.log("games fetched");
        state.gameAddresses = action.payload;
      }
    );
    builder.addCase(withdrawGameFunds.pending, (state) => {
      state.withdrawing = true;
    });
    builder.addCase(withdrawGameFunds.rejected, (state) => {
      state.withdrawing = false;
    });
    builder.addCase(withdrawGameFunds.fulfilled, (state) => {
      state.withdrawing = false;
    });
  },
});

export const { reducer, actions } = gameSlide;
export { reducer as gameReducer };
export const { stopCreatingGame } = actions;
