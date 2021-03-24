import { useDispatch } from "react-redux";
import { casino } from "../etherium";
import { fetchGameByAddress, stopCreatingGame } from "../store/Game/game.slide";
import { useEffect } from "react";
import {
  clearGambler,
  fetchAddress,
  fetchGambler,
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

    casino.on("gamblerRegistered", async (gamblerAddress: string) => {
      dispatch(fetchGambler(gamblerAddress));
    });

    (window as any).ethereum.on("accountsChanged", () => {
      dispatch(fetchAddress());
      dispatch(clearGambler());
    });
  }, []);
};
