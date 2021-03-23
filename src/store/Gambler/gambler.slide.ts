import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gambler, GAMBLER_REDUCER_INITIAL_STATE } from "./gambler.model";
import { casino, getGamblerContract, signer } from "../../etherium";

export const fetchAddress = createAsyncThunk("gambler/fetchAddress", () =>
  signer.getAddress()
);

export const createGambler = createAsyncThunk(
  "gambler/createGambler",
  async (name: string) => {
    await casino.registerGambler(name);
  }
);

export const fetchGamblerFromCasino = createAsyncThunk(
  "gambler/fetchGamblerFromCasino",
  async (address: string, store) => {
    const gamblerAddress = await casino.getGambler(address);
    return store.dispatch(fetchGambler(gamblerAddress));
  }
);

export const fetchGambler = createAsyncThunk(
  "gambler/fetchGambler",
  async (gamblerAddress: string): Promise<Gambler> => {
    const gambler = getGamblerContract(gamblerAddress);
    console.log({ gambler });
    return {
      address: gamblerAddress,
      name: await gambler.name(),
      gamesWon: (await gambler.numGamesWon()).toString(),
      games: await gambler.getGames(),
    };
  }
);

const gamblerSlide = createSlice({
  name: "gambler",
  initialState: GAMBLER_REDUCER_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGambler.fulfilled,
      (state, action: PayloadAction<Gambler>) => {
        state.needsRegister = false;
        state.creatingGambler = false;
        state.gambler = action.payload;
      }
    );
    builder.addCase(fetchGamblerFromCasino.rejected, (state) => {
      state.needsRegister = true;
    });
    builder.addCase(
      fetchAddress.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.userAddress = action.payload;
      }
    );
    builder.addCase(fetchGambler.rejected, () => {
      alert("error fetching gambler contract");
    });
    builder.addCase(createGambler.pending, (state) => {
      state.creatingGambler = true;
    });
    builder.addCase(createGambler.rejected, (state) => {
      state.creatingGambler = false;
    });
  },
});

const { reducer } = gamblerSlide;
export { reducer as gamblerReducer };
