import { useDispatch } from "react-redux";
import { tournament } from "../etherium";
import { fetchGameByAddress, stopCreatingGame } from "../store/Game/game.slide";
import { createGameDialogClose } from "../store/Dialogs/dialogs.slide";
import { useEffect } from "react";
import { fetchPlayerAddress } from "../store/Tournaments/tournaments.slide";

export const useListeners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    tournament.on("newGame", async (gameAddress: string) => {
      dispatch(createGameDialogClose());
      dispatch(fetchGameByAddress(gameAddress));
      dispatch(stopCreatingGame());
    });

    (window as any).ethereum.on("accountsChanged", () => {
      dispatch(fetchPlayerAddress());
    });
  }, []);
};
