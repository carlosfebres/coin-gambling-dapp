import { useMemo } from "react";
import { getGameContract } from "../etherium";

export const useGameContract = (gameAddress: string) => {
  const game = useMemo(() => getGameContract(gameAddress), [gameAddress]);
  const { withdrew, play, start } = game;
  return { withdrew, play, start };
};
