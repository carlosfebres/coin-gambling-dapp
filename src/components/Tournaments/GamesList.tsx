import React from "react";
import { GameItem } from "../Game";
import { Grid, Typography } from "@material-ui/core";

type TournamentsListProps = {
  gameAddress: string[];
};

export const GamesList: React.FC<TournamentsListProps> = ({ gameAddress }) => {
  if (!gameAddress.length) {
    return <Typography>No Games</Typography>;
  }

  return (
    <Grid container spacing={2} >
      {gameAddress.map((gameAddress) => (
        <Grid key={gameAddress} item xs={6}>
          <GameItem address={gameAddress} />
        </Grid>
      ))}
    </Grid>
  );
};
