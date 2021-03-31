import { useDispatch } from "react-redux";
import { startGamePlay } from "../store/Game/game.slide";
import { useCallback, useMemo } from "react";
import { Game } from "../store/Game/game.models";
import { useRootSelector } from "../store/utils";
import { getPlayingGames } from "../store/Game/game.selectors";

export const useGameContract = (game: Game) => {
  const dispatch = useDispatch();
  const playingGames = useRootSelector(getPlayingGames);

  const isPlaying = useMemo(() => {
    return playingGames.includes(game.address);
  }, [playingGames]);

  const play = useCallback(() => {
    dispatch(startGamePlay(game.address));
  }, [game.address]);

  return { isPlaying, play };
};
