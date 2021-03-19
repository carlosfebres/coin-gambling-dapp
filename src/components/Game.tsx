import React, { useEffect } from "react";
import { Game } from "../store/Game/game.models";
import { useDispatch } from "react-redux";
import { fetchGameByAddress } from "../store/Game/game.slide";
import { useRootSelector } from "../store/utils";
import { getGameByAddress } from "../store/Game/game.selectors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useGameContract } from "../hooks/useGameContract";

type GameProps = {
  address: Game["address"];
};

export const GameItem: React.FC<GameProps> = ({ address }) => {
  const game = useRootSelector(getGameByAddress(address));
  const dispatch = useDispatch();

  const { start, play, withdrew } = useGameContract(address);

  useEffect(() => {
    dispatch(fetchGameByAddress(address));
  }, []);

  if (!game) {
    return <h4>Game not found</h4>;
  }

  return (
    <Card>
      <CardContent>
        <Typography>Game Address:</Typography>
        <Typography>{game.address}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => start()}>
          Start Game
        </Button>
        <Button size="small" color="primary" onClick={() => play()}>
          Play Game
        </Button>
        <Button size="small" color="primary" onClick={() => withdrew()}>
          Withdraw
        </Button>
      </CardActions>
    </Card>
  );
};
