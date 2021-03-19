import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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
      starter: await game.starter(),
      winner: await game.winner(),
      amount: (await game.amount()).toString(),
      minAmount: (await game.minAmount()).toString(),
    };
  }
);

export const startGame = createAsyncThunk(
  "tournaments/startGame",
  async (gameAddress: string, store) => {
    console.log("start game: ", gameAddress);
    const state = store.getState() as RootState;
    const gameContract = getGameContract(gameAddress);
    console.log("start game with: ", state.game.betAmount);

    const transaction = await gameContract.start({
      value: state.game.betAmount,
    });
    await transaction.wait();

    store.dispatch(fetchGameByAddress(gameAddress));
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
    const transaction = await tournament.createGame();
    await transaction.wait();
    return betAmount;
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
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.creatingGame = false;
      state.betAmount = action.payload;
    });
    builder.addCase(
      fetchGameAddresses.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        console.log("games fetched");
        state.gameAddresses = action.payload;
      }
    );
    builder.addCase(startGame.fulfilled, (state, action: Action<string>) => {
      state.betAmount = "0";
    });
  },
});

export const { reducer, actions } = gameSlide;
export { reducer as gameReducer };
export const { stopCreatingGame } = actions;
