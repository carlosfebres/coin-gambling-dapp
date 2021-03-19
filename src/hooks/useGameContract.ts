import { useDispatch } from "react-redux";
import { startGamePlay, withdrawGameFunds } from "../store/Game/game.slide";

export const useGameContract = (gameAddress: string) => {
  const dispatch = useDispatch();
  console.log("useGameContact...");

  const withdraw = async () => {
    dispatch(withdrawGameFunds(gameAddress));
  };

  const play = async () => {
    dispatch(startGamePlay(gameAddress));
  };

  return { withdraw, play };
};
