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
import { getAllTournaments } from "../store/Tournaments/tournaments.selectors";

type GameProps = {
  address: Game["address"];
};

export const GameItem: React.FC<GameProps> = ({ address }) => {
  const game = useRootSelector(getGameByAddress(address));
  const playerAddress = useRootSelector(getAllTournaments);
  const dispatch = useDispatch();

  const { play, withdraw } = useGameContract(address);

  useEffect(() => {
    dispatch(fetchGameByAddress(address));
  }, []);

  if (!game) {
    return <h4>Game not found</h4>;
  }

  const imWinner = game.winner === playerAddress;
  const imGambler = game.gambler === playerAddress;

  return (
    <Card>
      <CardContent>
        <Typography>
          Status: <b>{game.finished ? "Finished" : "Waiting for a rival"}</b>
        </Typography>
        {game.finished ? (
          <Typography>
            Withdrew: <b>{game.withdrew ? "Yes" : "No"}</b>
          </Typography>
        ) : null}
        <Typography>Game Address:</Typography>
        <Typography style={{ fontSize: 11 }}>{game.address}</Typography>
        <Typography>Gambler:</Typography>
        <Typography style={{ fontSize: 11 }}>{game.gambler}</Typography>
        {game.finished ? (
          <>
            <Typography>Winner:</Typography>
            <Typography style={{ fontSize: 11 }}>{game.winner}</Typography>
          </>
        ) : null}
        <Typography>
          {game.finished ? "Winner Earned Amount" : "Bit Amount"}:
        </Typography>
        <Typography style={{ fontSize: 11 }}>{game.bitAmount} wei</Typography>
      </CardContent>
      <CardActions>
        {!imGambler && !game.finished ? (
          <Button size="small" color="primary" onClick={() => play()}>
            Play Game
          </Button>
        ) : null}
        {imWinner && !game.withdrew ? (
          <Button size="small" color="primary" onClick={() => withdraw()}>
            Withdraw
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};
