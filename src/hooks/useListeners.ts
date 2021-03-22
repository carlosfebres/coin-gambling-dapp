import { useDispatch } from "react-redux";
import { casino } from "../etherium";
import { fetchGameByAddress, stopCreatingGame } from "../store/Game/game.slide";
import { useEffect } from "react";
import {
  fetchAddress,
  fetchGambler,
  setNeedsRegistration,
} from "../store/Gambler/gambler.slide";
import { setCreateGameDialog } from "../store/Dialogs/dialogs.slide";

export const useListeners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    casino.on("newGame", async (gameAddress: string) => {
      console.log('new game event');
      dispatch(setCreateGameDialog(false));
      dispatch(fetchGameByAddress(gameAddress));
      dispatch(stopCreatingGame());
    });

    casino.on("gamblerRegistered", async (gamblerAddress: string) => {
      console.log('gambler registered event');
      dispatch(setNeedsRegistration(false));
      dispatch(fetchGambler(gamblerAddress));
    });

    (window as any).ethereum.on("accountsChanged", () => {
      console.log('account changed event');
      dispatch(fetchAddress());
    });
  }, []);
};
