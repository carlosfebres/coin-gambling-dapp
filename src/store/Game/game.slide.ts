import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, GAME_REDUCER_INITIAL_STATE } from "./game.models";
import { casino, getGameContract } from "../../etherium";
import { RootState } from "../utils";
import { getGamblerAddress } from "../Gambler/gambler.selector";
import { getGameByAddress } from "./game.selectors";
import { formatEthersReturnMessage } from "../../shared/utils";

export const fetchGameByAddress = createAsyncThunk<Game, string>(
  "game/fetchGameByAddress",
  async (gameAddress) => {
    const game = getGameContract(gameAddress);
    return {
      address: gameAddress,
      finished: await game.finished(),
      player1: await game.player1(),
      player2: await game.player2(),
      winner: await game.winner(),
      betAmount: (await game.betAmount()).toString(),
    };
  }
);

export const fetchGameAddresses = createAsyncThunk(
  "game/fetchGameAddresses",
  async (arg, store) => {
    const games = await casino.getGames();
    games.forEach((gameAddress: string) => {
      store.dispatch(fetchGameByAddress(gameAddress));
    });
    return games;
  }
);

export const createGame = createAsyncThunk(
  "game/createGame",
  async (betAmount: string, store) => {
    const state = store.getState() as RootState;
    const gamblerAddress = getGamblerAddress(state);
    try {
      const transaction = await casino.createGame(gamblerAddress, {
        value: betAmount,
      });
      await transaction.wait();
    } catch (error) {
      const message = error.data?.message || error.message;
      throw new Error(formatEthersReturnMessage(message));
    }
  }
);

export const startGamePlay = createAsyncThunk(
  "game/startGamePlay",
  async (gameAddress: string, store) => {
    const state = store.getState() as RootState;
    const game = getGameByAddress(gameAddress)(state);
    const gamblerAddress = getGamblerAddress(state);

    if (!game) {
      throw new Error("Game not found");
    }

    const gameContract = getGameContract(gameAddress);
    
    const transaction = await gameContract.play(gamblerAddress, {
      value: game.betAmount,
    });
    await transaction.wait();

    store.dispatch(fetchGameByAddress(gameAddress));
  }
);

export const gameSlide = createSlice({
  name: "game",
  initialState: GAME_REDUCER_INITIAL_STATE,
  reducers: {
    stopCreatingGame(state) {
      state.creatingGame = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGameByAddress.fulfilled, (state, action) => {
      const game = action.payload;
      state.games[game.address] = game;
      state.loading = false;
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
    builder.addCase(
      fetchGameAddresses.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.gameAddresses = action.payload;
        if (!state.gameAddresses.length) {
          state.loading = false;
        }
      }
    );
    builder.addCase(fetchGameAddresses.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reducer, actions } = gameSlide;
export { reducer as gameReducer };
export const { stopCreatingGame } = actions;
