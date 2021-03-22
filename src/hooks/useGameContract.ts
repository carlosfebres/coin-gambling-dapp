import { useDispatch } from "react-redux";
import { startGamePlay } from "../store/Game/game.slide";
import { useCallback } from "react";

export const useGameContract = (gameAddress: string) => {
  const dispatch = useDispatch();

  const play = useCallback(() => {
    dispatch(startGamePlay(gameAddress));
  }, [gameAddress]);

  return { play };
};
