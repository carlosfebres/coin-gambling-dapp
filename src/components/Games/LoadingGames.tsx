import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import {createStyles, Theme} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      backgroundColor: "#263238",
      borderRadius: 16,
    },
  })
);

export const GamesLoading = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Paper>
  );
};
