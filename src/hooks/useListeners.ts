import { useDispatch } from "react-redux";
import { casino, getEthereum, provider } from "../ethereum";
import { fetchGameByAddress, stopCreatingGame } from "../store/Game/game.slide";
import { useEffect } from "react";
import {
  clearGambler,
  fetchAddress,
  setNeedsRegister,
  setWalletConnected,
} from "../store/Gambler/gambler.slide";
import { setCreateGameDialog } from "../store/Dialogs/dialogs.slide";

export const useListeners = () => {
  const dispatch = useDispatch();
  const ethereum = getEthereum();

  if (!ethereum) {
    throw new Error("Metamask is not installed");
  }

  useEffect(() => {
    casino.on("newGame", (gameAddress: string) => {
      dispatch(setCreateGameDialog(false));
      dispatch(fetchGameByAddress(gameAddress));
      dispatch(stopCreatingGame());
    });

    ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length) {
        dispatch(fetchAddress());
        dispatch(clearGambler());
        dispatch(setWalletConnected(true));
      } else {
        dispatch(clearGambler());
        dispatch(setWalletConnected(false));
        dispatch(setNeedsRegister(false));
      }
    });

    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });

    return () => {
      casino.removeAllListeners();
    };
  }, []);
};
