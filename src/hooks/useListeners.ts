import { useDispatch } from "react-redux";
import { tournament } from "../etherium";
import {fetchGameByAddress, startGame, stopCreatingGame} from "../store/Game/game.slide";
import { createGameDialogClose } from "../store/Dialogs/dialogs.slide";

const done: string[] = [];

export const useListeners = () => {
  const dispatch = useDispatch();

  tournament.on("newGame", async (gameAddress: string, event) => {
    if (done.includes(gameAddress)) return;
    done.push(gameAddress);
    console.log("new game event!", gameAddress, event);
    dispatch(createGameDialogClose());
    await dispatch(startGame(gameAddress));
    dispatch(stopCreatingGame());
  });
};
