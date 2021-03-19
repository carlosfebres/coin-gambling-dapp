import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, gameReducerInitialState } from "./game.models";
import { getGameContract, tournament } from "../../etherium";

const fetchGameByAddress = createAsyncThunk<Game, string>(
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
const fetchGameAddresses = createAsyncThunk(
  "tournaments/fetchGameAddresses",
  () => {
    return tournament.getGames();
  }
);

export const createGame = createAsyncThunk(
  "tournaments/createGame",
  async () => {
    const transaction = await tournament.createGame();
    const wait = await transaction.wait();
    console.log({ transaction, wait });
  }
);

export const gameSlide = createSlice({
  name: "game",
  initialState: gameReducerInitialState,
  reducers: {
    setGamesAddresses(state, action: PayloadAction<string[]>) {
      state.gameAddresses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGameByAddress.fulfilled, (state, action) => {
      const game = action.payload;
      state.games[game.address] = game;
    });
    builder.addCase(createGame.pending, (state) => {
      state.creatingGame = true;
    });
    builder.addCase(createGame.rejected, (state) => {
      state.creatingGame = false;
    });
    builder.addCase(createGame.fulfilled, (state) => {
      state.creatingGame = false;
      // fetchGameAddresses is not called, dispatch action after action
      fetchGameAddresses();
    });
    builder.addCase(
      fetchGameAddresses.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        console.log("games fetched");
        state.gameAddresses = action.payload;
      }
    );
  },
});

const { actions, reducer } = gameSlide;
export const { setGamesAddresses } = actions;

// // TODO: use createAsyncThunk
// const fetchGameAddresses = () => {
//   return async (dispatch: Dispatch) => {
//     const gamesAddresses = await tournament.getGames();
//     dispatch(setGamesAddresses(gamesAddresses));
//   };
// };

export { reducer as gameReducer, fetchGameByAddress, fetchGameAddresses };
