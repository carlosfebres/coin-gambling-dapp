import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gambler, GAMBLER_REDUCER_INITIAL_STATE } from "./gambler.model";
import {
  casino,
  ethersConnectWallet,
  getGamblerContract,
  provider,
  signer,
} from "../../etherium";
import { RootState } from "../utils";
import { getGamblerAddress } from "./gambler.selector";
import { getGamblerRegistredEventFromTransactionData } from "./gambler.utils";
import { fetchGameAddresses } from "../Game/game.slide";

export const fetchAddress = createAsyncThunk("gambler/fetchAddress", () =>
  signer.getAddress()
);

export const createGambler = createAsyncThunk(
  "gambler/createGambler",
  async (name: string, store) => {
    const transaction = await casino.registerGambler(name);
    const result = await transaction.wait();
    const gamblerAddress = getGamblerRegistredEventFromTransactionData(result);
    if (gamblerAddress) {
      store.dispatch(fetchGambler(gamblerAddress));
      store.dispatch(fetchGameAddresses());
    }
  }
);

export const fetchGamblerFromCasino = createAsyncThunk(
  "gambler/fetchGamblerFromCasino",
  async (address: string, store) => {
    const gamblerAddress = await casino.getGambler(address);
    store.dispatch(fetchGambler(gamblerAddress));
  }
);

export const fetchGambler = createAsyncThunk(
  "gambler/fetchGambler",
  async (gamblerAddress: string): Promise<Gambler> => {
    const gambler = getGamblerContract(gamblerAddress);
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

export const connectWallet = createAsyncThunk(
  "game/connectWallet",
  async () => {
    await ethersConnectWallet();
  }
);

const gamblerSlide = createSlice({
  name: "gambler",
  initialState: GAMBLER_REDUCER_INITIAL_STATE,
  reducers: {
    setWithdrawProcess(state, action: PayloadAction<boolean>) {
      state.withdrawProcess = action.payload;
    },
    setWalletConnected(state, action: PayloadAction<boolean>) {
      state.walletConnected = action.payload;
    },
    setNeedsRegister(state, action: PayloadAction<boolean>) {
      state.needsRegister = action.payload;
    },
    clearGambler(state) {
      state.gambler = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchGambler.fulfilled,
      (state, action: PayloadAction<Gambler>) => {
        state.loading = false;
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
        state.walletConnected = true;
      }
    );
    builder.addCase(
      fetchAddress.rejected,
      (state) => {
        state.walletConnected = false;
      }
    );
    builder.addCase(fetchGambler.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGambler.rejected, () => {
      alert("error fetching gambler contract");
    });
    builder.addCase(createGambler.pending, (state) => {
      state.loading = false;
      state.creatingGambler = true;
    });
    builder.addCase(createGambler.rejected, (state) => {
      state.loading = false;
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
    builder.addCase(connectWallet.fulfilled, (state) => {
      state.walletConnected = true;
    });
  },
});

const { reducer, actions } = gamblerSlide;
export { reducer as gamblerReducer };
export const {
  clearGambler,
  setWithdrawProcess,
  setWalletConnected,
  setNeedsRegister,
} = actions;
