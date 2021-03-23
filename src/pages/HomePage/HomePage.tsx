import React, {useEffect} from "react";
import {useRootSelector} from "../../store/utils";
import {getGameAddresses} from "../../store/Game/game.selectors";
import {useDispatch} from "react-redux";
import {fetchGameAddresses} from "../../store/Game/game.slide";
import {Container, makeStyles} from "@material-ui/core";
import {useListeners} from "../../hooks/useListeners";
import {fetchAddress} from "../../store/Gambler/gambler.slide";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {CreateGameFabButton} from "../../components/Games/CreateGameFabButton";
import {GamesList} from "../../components/Games/GamesList";
import {createStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();

  const gameAddresses = useRootSelector(getGameAddresses);
  const dispatch = useDispatch();

  useListeners();

  useEffect(() => {
    dispatch(fetchAddress());
    dispatch(fetchGameAddresses());
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Typography
          color="textSecondary"
          className={classes.text}
          variant="h5"
          gutterBottom
        >
          Games
        </Typography>
        <GamesList gameAddress={gameAddresses} />
      </Container>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar variant="dense">
          <CreateGameFabButton />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
