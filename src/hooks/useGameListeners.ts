import { useEffect } from "react";
import { getGameContract } from "../ethereum";
import { fetchGameByAddress } from "../store/Game/game.slide";
import { useDispatch } from "react-redux";
import { Game } from "../store/Game/game.models";

export const useGameListener = (game: Game) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (game && !game.finished) {
      if (!game.finished) {
        const gameContract = getGameContract(game.address);
        gameContract.on("gameFinished", () => {
          dispatch(fetchGameByAddress(game.address));
        });
        return () => {
          gameContract.removeAllListeners();
        };
      }
    }
  }, [game?.finished]);
};
