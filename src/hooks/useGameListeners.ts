import { useEffect } from "react";
import { getGameContract } from "../etherium";
import { fetchGameByAddress } from "../store/Game/game.slide";
import { useDispatch } from "react-redux";
import { useRootSelector } from "../store/utils";
import { getGameByAddress } from "../store/Game/game.selectors";

export const useGameListener = (gameAddress: string) => {
  const dispatch = useDispatch();
  const game = useRootSelector(getGameByAddress(gameAddress));
  console.log({ game });

  useEffect(() => {
    if (game && !game.finished) {
      console.log('listening to game finish event');
      const gameContract = getGameContract(gameAddress);
      gameContract.on("gameFinished", () => {
        dispatch(fetchGameByAddress(gameAddress));
      });
    }
  }, [game?.finished]);
};
