import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gambler, GAMBLER_REDUCER_INITIAL_STATE } from "./gambler.model";
import { casino, getGamblerContract, provider, signer } from "../../etherium";
import { RootState } from "../utils";
import { getGamblerAddress } from "./gambler.selector";

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
      balance: (await provider.getBalance(gamblerAddress)).toString(),
    };
  }
);

export const withdrawGameFunds = createAsyncThunk(
  "game/withdrawGameFunds",
  async (arg, store) => {
    const state = store.getState() as RootState;
    const gamblerAddress = getGamblerAddress(state);
    if (gamblerAddress) {
      const gamblerContract = getGamblerContract(gamblerAddress);
      const transaction = await gamblerContract.withdraw();
      await transaction.wait();
      store.dispatch(fetchGambler(gamblerAddress));
    }
  }
);

const gamblerSlide = createSlice({
  name: "gambler",
  initialState: GAMBLER_REDUCER_INITIAL_STATE,
  reducers: {
    setWithdrawProcess(state, action: PayloadAction<boolean>) {
      state.withdrawProcess = action.payload;
    },
    clearGambler(state) {
      state.gambler = undefined;
    },
  },
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
    builder.addCase(withdrawGameFunds.pending, (state) => {
      state.withdrawing = true;
    });
    builder.addCase(withdrawGameFunds.rejected, (state) => {
      state.withdrawing = false;
    });
    builder.addCase(withdrawGameFunds.fulfilled, (state) => {
      state.withdrawing = false;
      state.withdrawProcess = false;
    });
  },
});

const { reducer, actions } = gamblerSlide;
export { reducer as gamblerReducer };
export const { clearGambler, setWithdrawProcess } = actions;
