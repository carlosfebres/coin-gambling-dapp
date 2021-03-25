import React from "react";
import { GameItem } from "./Game";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Game } from "../../store/Game/game.models";
import { NoGames } from "./NoGames";
import { GamesLoading } from "./LoadingGames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginBottom: theme.spacing(2),
    },
  })
);

type GamesListProps = {
  games: Game[];
  loading?: boolean;
};

export const GamesList: React.FC<GamesListProps> = ({
  games,
  loading = false,
}) => {
  const classes = useStyles();

  if (loading) return <GamesLoading />;
  if (!games.length) return <NoGames />;

  return (
    <List className={classes.list}>
      {games.map((game) => (
        <GameItem key={game.address} game={game} />
      ))}
    </List>
  );
};
