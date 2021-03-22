import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, gameReducerInitialState } from "./game.models";
import { getGameContract, casino } from "../../etherium";
import { RootState } from "../utils";
import { getGamblerAddress } from "../Gambler/gambler.selector";
import { getGameByAddress } from "./game.selectors";

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
      bitAmount: (await game.bitAmount()).toString(),
    };
  }
);

export const fetchGameAddresses = createAsyncThunk(
  "game/fetchGameAddresses",
  () => casino.getGames()
);

export const createGame = createAsyncThunk(
  "game/createGame",
  async (betAmount: string, store) => {
    const state = store.getState() as RootState;
    const gamblerAddress = getGamblerAddress(state);
    const transaction = await casino.createGame(gamblerAddress, {
      value: betAmount,
    });
    await transaction.wait();
  }
);

export const withdrawGameFunds = createAsyncThunk(
  "game/withdrawGameFunds",
  async (gameAddress: string, store) => {
    const game = getGameContract(gameAddress);
    const transaction = await game.withdraw();
    await transaction.wait();
    store.dispatch(fetchGameByAddress(gameAddress));
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

    console.log({ gameContract, gamblerAddress });
    const transaction = await gameContract.play(gamblerAddress, {
      value: game.bitAmount,
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
