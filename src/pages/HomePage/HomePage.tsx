import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import { Chip, Container, Grid, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, Theme } from "@material-ui/core/styles";

import { useRootSelector } from "../../store/utils";
import { fetchGameAddresses } from "../../store/Game/game.slide";
import { useListeners } from "../../hooks/useListeners";
import {
  fetchAddress,
  setWithdrawProcess,
} from "../../store/Gambler/gambler.slide";
import { CreateGameFabButton } from "../../components/Games/CreateGameFabButton";
import {
  getGambler,
  getWalletConnected,
} from "../../store/Gambler/gambler.selector";
import { formatShortAddress } from "../../shared/utils";
import { GamesContent } from "../../components/Games/GamesContent";

// Icons
import FaceIcon from "@material-ui/icons/Face";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DnsIcon from "@material-ui/icons/Dns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
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
  const isWalletConnected = useRootSelector(getWalletConnected);
  const gamblerBalance = gambler && ethers.utils.formatEther(gambler.balance);

  useListeners();

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  useEffect(() => {
    if (isWalletConnected) {
      dispatch(fetchGameAddresses());
    }
  }, [isWalletConnected]);

  const handleWithdraw = () => {
    dispatch(setWithdrawProcess(true));
  };

  return (
    <React.Fragment>
      <Container className={classes.mainContainer}>
        <GamesContent />
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
