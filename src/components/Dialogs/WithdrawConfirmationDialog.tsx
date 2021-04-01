import React from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { useRootSelector } from "../../store/utils";
import { useDispatch } from "react-redux";
import {
  getGambler,
  getIsWithdrawing,
  getWithdrawProcess,
} from "../../store/Gambler/gambler.selector";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Transition } from "./DialogTransition";
import {
  setWithdrawProcess,
  withdrawGameFunds,
} from "../../store/Gambler/gambler.slice";
import { ethers } from "ethers";

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
      padding: theme.spacing(2, 2, 2, 2),
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

export const WithdrawConfirmationDialog = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const isWithdrawing = useRootSelector(getIsWithdrawing);
  const openWithdraw = useRootSelector(getWithdrawProcess);
  const gambler = useRootSelector(getGambler);

  if (!gambler) return null;

  const handleWithdraw = () => {
    dispatch(withdrawGameFunds());
  };
  const handleClose = () => {
    dispatch(setWithdrawProcess(false));
  };

  const balance = ethers.utils.formatEther(gambler.balance);

  return (
    <Dialog
      open={openWithdraw}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ className: styles.dialog }}
    >
      <DialogTitle className={styles.dialogTitle}>Register</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <DialogContentText className={styles.dialogText}>
          You currently have {balance} ETH available. Do withdraw you want to
          withdraw all the funds?.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          variant="contained"
          disabled={isWithdrawing}
          onClick={handleClose}
          color="secondary"
        >
          Close
        </Button>
        <Button
          variant="contained"
          disabled={isWithdrawing}
          onClick={handleWithdraw}
          color="secondary"
        >
          Withdraw
        </Button>
      </DialogActions>
      {isWithdrawing ? <LinearProgress /> : null}
    </Dialog>
  );
};
