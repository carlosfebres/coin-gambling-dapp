import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type NoGamesProps = {
  big?: boolean;
};

export const NoGames: React.FC<NoGamesProps> = ({ big = false }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container direction="column" alignContent="center">
        {big ? (
          <Grid item className={classes.arrowIconContainer}>
            <ArrowDownwardIcon className={classes.arrowIcon} />
          </Grid>
        ) : null}
        <Grid item>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            color="textSecondary"
          >
            There are no games
          </Typography>
          {big ? (
            <Typography
              align="center"
              color="textSecondary"
              className={classes.subTitle}
            >
              Click the + button to create a new game
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};
