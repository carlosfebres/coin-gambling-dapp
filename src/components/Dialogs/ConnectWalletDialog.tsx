import React from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { useRootSelector } from "../../store/utils";
import {
  getMetamaskInstalled,
  getWalletConnected,
} from "../../store/Gambler/gambler.selector";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Transition } from "./DialogTransition";
import { ReactComponent as MetamaskFoxIcon } from "../../images/metamask-fox.svg";
import { connectWallet } from "../../store/Gambler/gambler.slice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      borderRadius: 16,
    },
    dialogTitle: {
      padding: theme.spacing(2, 2, 2, 3),
      color: theme.palette.text.secondary,
      backgroundColor: "rgba(0,0,0,.8)",
    },
    dialogContent: {
      padding: theme.spacing(2, 2, 3, 2),
    },
    dialogText: {
      padding: theme.spacing(2, 2, 2, 2),
      color: theme.palette.text.primary,
    },
    dialogActions: {
      padding: theme.spacing(1, 3, 1, 1),
      backgroundColor: "rgba(0,0,0,.8)",
    },
  })
);

export const ConnectWalletDialog = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const isWalletConnected = useRootSelector(getWalletConnected);
  const isMetamaskInstalled = useRootSelector(getMetamaskInstalled);

  const handleConnection = () => {
    dispatch(connectWallet());
  };

  return (
    <Dialog
      open={!isWalletConnected && isMetamaskInstalled}
      TransitionComponent={Transition}
      PaperProps={{ className: styles.dialog }}
    >
      <DialogContent className={styles.dialogContent}>
        <Typography className={styles.dialogText}>
          Our dApp needs to connect with your wallet
        </Typography>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={handleConnection}
              color="primary"
              size="large"
              startIcon={
                <SvgIcon
                  fontSize="large"
                  component={MetamaskFoxIcon}
                  viewBox="0 0 318.6 318.6"
                />
              }
            >
              Connect Wallet
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
