import React from "react";
import { GameItem } from "./Game";
import { makeStyles, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginBottom: theme.spacing(2),
    },
  })
);

type GamesListProps = {
  gameAddress: string[];
};

export const GamesList: React.FC<GamesListProps> = ({ gameAddress }) => {
  const classes = useStyles();

  if (!gameAddress.length) {
    return <Typography>No Games</Typography>;
  }

  return (
    <List className={classes.list}>
      {gameAddress.map((gameAddress) => (
        <GameItem key={gameAddress} address={gameAddress} />
      ))}
    </List>
  );
};
