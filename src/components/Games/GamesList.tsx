import React from "react";
import { GameItem } from "./Game";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { createStyles, Theme } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginBottom: theme.spacing(2),
    },
    container: {
      padding: theme.spacing(2),
      backgroundColor: "#263238",
      borderRadius: 16,
    },
    arrowIconContainer: {
      alignSelf: "center",
    },
    arrowIcon: {
      fontSize: 128,
      color: "white",
    },
    subTitle: {
      fontSize: 14,
    },
  })
);

type GamesListProps = {
  gameAddress: string[];
};

export const GamesList: React.FC<GamesListProps> = ({ gameAddress }) => {
  const classes = useStyles();

  if (!gameAddress.length) {
    return (
      <Paper className={classes.container}>
        <Grid container direction="column" alignContent="center">
          <Grid item className={classes.arrowIconContainer}>
            <ArrowDownwardIcon className={classes.arrowIcon} />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              color="textSecondary"
            >
              There are no games
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              className={classes.subTitle}
            >
              Click the + button to create a new game
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <List className={classes.list}>
      {gameAddress.map((gameAddress) => (
        <GameItem key={gameAddress} address={gameAddress} />
      ))}
    </List>
  );
};
