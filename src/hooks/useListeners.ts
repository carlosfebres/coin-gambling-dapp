import { useDispatch } from "react-redux";
import { casino, provider } from "../etherium";
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

  useEffect(() => {
    casino.on("newGame", async (gameAddress: string) => {
      dispatch(setCreateGameDialog(false));
      dispatch(fetchGameByAddress(gameAddress));
      dispatch(stopCreatingGame());
    });

    (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
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
