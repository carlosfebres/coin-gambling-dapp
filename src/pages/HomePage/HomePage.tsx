import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { Chip, Container, Grid, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme } from "@material-ui/core/styles";
import { useRootSelector } from "../../store/utils";
import {
  getFinishedGames,
  getGamblerGames,
  getOpenGames,
} from "../../store/Game/game.selectors";
import { fetchGameAddresses } from "../../store/Game/game.slide";
import { useListeners } from "../../hooks/useListeners";
import {
  fetchAddress,
  setWithdrawProcess,
} from "../../store/Gambler/gambler.slide";
import { CreateGameFabButton } from "../../components/Games/CreateGameFabButton";
import { GamesList } from "../../components/Games/GamesList";
import { NoGames } from "../../components/Games/NoGames";
import { getGambler } from "../../store/Gambler/gambler.selector";

import FaceIcon from "@material-ui/icons/Face";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DnsIcon from "@material-ui/icons/Dns";
import { formatShortAddress } from "../../shared/utils";

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
    noGameContainer: {
      marginTop: 32,
    },
    mainContainer: {
      paddingBottom: theme.spacing(12),
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const gambler = useRootSelector(getGambler);
  const gamblerGames = useRootSelector(getGamblerGames);
  const openGames = useRootSelector(getOpenGames);
  const finishedGames = useRootSelector(getFinishedGames);

  useListeners();

  useEffect(() => {
    dispatch(fetchAddress());
    dispatch(fetchGameAddresses());
  }, []);

  const showNoGames = !(
    gamblerGames.length +
    openGames.length +
    finishedGames.length
  );
  const gamblerBalance = gambler && ethers.utils.formatEther(gambler.balance);

  const handleWithdraw = () => {
    dispatch(setWithdrawProcess(true));
  };

  return (
    <React.Fragment>
      <Container className={classes.mainContainer}>
        {showNoGames ? (
          <div className={classes.noGameContainer}>
            <NoGames big />
          </div>
        ) : null}
        {!showNoGames ? (
          <>
            <Typography
              color="textSecondary"
              className={classes.text}
              variant="h5"
              gutterBottom
            >
              Open Games
            </Typography>
            <GamesList games={openGames} />
            <Typography
              color="textSecondary"
              className={classes.text}
              variant="h5"
              gutterBottom
            >
              My Games
            </Typography>
            <GamesList games={gamblerGames} />
            <Typography
              color="textSecondary"
              className={classes.text}
              variant="h5"
              gutterBottom
            >
              Finished Games
            </Typography>
            <GamesList games={finishedGames} />
          </>
        ) : null}
      </Container>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar variant="dense">
          <CreateGameFabButton />
          {gambler ? (
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Chip
                  icon={<FaceIcon />}
                  label={gambler.name}
                  clickable
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<DnsIcon />}
                  label={formatShortAddress(gambler.address)}
                  clickable
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <Chip
                  label={`Games Won: ${gambler.gamesWon}`}
                  clickable
                  color="secondary"
                />
              </Grid>
              <Grid item>
                <Chip
                  onClick={handleWithdraw}
                  icon={<AccountBalanceWalletIcon />}
                  label={`${gamblerBalance} ETH`}
                  clickable
                  color="secondary"
                />
              </Grid>
            </Grid>
          ) : null}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
