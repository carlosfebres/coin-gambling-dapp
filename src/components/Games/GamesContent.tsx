import Typography from "@material-ui/core/Typography";
import { GamesList } from "./GamesList";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { NoGames } from "./NoGames";
import { useRootSelector } from "../../store/utils";
import {
  getFinishedGames,
  getGamblerGames,
  getGamesLoading,
  getOpenGames,
} from "../../store/Game/game.selectors";
import { getGamblerLoading } from "../../store/Gambler/gambler.selector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    grow: {
      flexGrow: 1,
    },
    noGameContainer: {
      marginTop: 32,
    },
  })
);

export const GamesContent = () => {
  const classes = useStyles();

  const gamblerGames = useRootSelector(getGamblerGames);
  const openGames = useRootSelector(getOpenGames);
  const finishedGames = useRootSelector(getFinishedGames);
  const areGamesLoading = useRootSelector(getGamesLoading);
  const isGamblerLoading = useRootSelector(getGamblerLoading);

  const loading = areGamesLoading || isGamblerLoading;

  const showNoGames = !(
    gamblerGames.length +
    openGames.length +
    finishedGames.length
  );

  if (showNoGames && !loading)
    return (
      <div className={classes.noGameContainer}>
        <NoGames big />
      </div>
    );

  return (
    <>
      <Typography
        color="textSecondary"
        className={classes.text}
        variant="h5"
        gutterBottom
      >
        Open Games
      </Typography>
      <GamesList loading={loading} games={openGames} />
      <Typography
        color="textSecondary"
        className={classes.text}
        variant="h5"
        gutterBottom
      >
        My Games
      </Typography>
      <GamesList loading={loading} games={gamblerGames} />
      <Typography
        color="textSecondary"
        className={classes.text}
        variant="h5"
        gutterBottom
      >
        Finished Games
      </Typography>
      <GamesList loading={loading} games={finishedGames} />
    </>
  );
};
