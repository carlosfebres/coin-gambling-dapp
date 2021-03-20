import { useDispatch } from "react-redux";
import { startGamePlay, withdrawGameFunds } from "../store/Game/game.slide";
import { useCallback } from "react";

export const useGameContract = (gameAddress: string) => {
  const dispatch = useDispatch();

  const withdraw = useCallback(() => {
    dispatch(withdrawGameFunds(gameAddress));
  }, [gameAddress]);

  const play = useCallback(() => {
    dispatch(startGamePlay(gameAddress));
  }, [gameAddress]);

  return { withdraw, play };
};
