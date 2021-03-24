import { useDispatch } from "react-redux";
import { startGamePlay } from "../store/Game/game.slide";
import { useCallback } from "react";
import { Game } from "../store/Game/game.models";

export const useGameContract = (game: Game) => {
  const dispatch = useDispatch();

  const play = useCallback(() => {
    dispatch(startGamePlay(game.address));
  }, [game.address]);

  return { play };
};
