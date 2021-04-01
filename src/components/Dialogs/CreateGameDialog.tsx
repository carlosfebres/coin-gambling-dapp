import React, { useState } from "react";
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
import { getIsCreateGameDialogOpen } from "../../store/Dialogs/dialogs.selector";
import { useDispatch } from "react-redux";
import { CurrencyInput } from "../Inputs/CurrencyInput";
import { getIsCreatingGame } from "../../store/Game/game.selectors";
import { createGame } from "../../store/Game/game.slice";
import { setCreateGameDialog } from "../../store/Dialogs/dialogs.slice";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Transition } from "./DialogTransition";

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
      padding: theme.spacing(4, 2),
    },
    dialogActions: {
      padding: theme.spacing(1, 3, 1, 1),
      backgroundColor: "rgba(0,0,0,.8)",
    },
  })
);

export const CreateGameDialog = () => {
  const styles = useStyles();

  const isCreateGameDialogOpen = useRootSelector(getIsCreateGameDialogOpen);
  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const dispatch = useDispatch();
  const [betAmount, setBetAmount] = useState<string>("0");

  const handleClose = () => dispatch(setCreateGameDialog(false));
  const handleCreation = () => {
    dispatch(createGame(betAmount));
  };

  return (
    <Dialog
      open={isCreateGameDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ className: styles.dialog }}
    >
      <DialogTitle className={styles.dialogTitle}>Create Game</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <DialogContentText color="textPrimary">
          Create a game to bet with some player, having a 50/50 provability of
          winning (or losing :D).
        </DialogContentText>
        <CurrencyInput
          disabled={isCreatingGame}
          onChange={(total) => setBetAmount(total)}
        />
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          variant="contained"
          disabled={isCreatingGame}
          onClick={handleClose}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isCreatingGame}
          onClick={handleCreation}
          color="primary"
        >
          Start Game
        </Button>
      </DialogActions>
      {isCreatingGame ? <LinearProgress /> : null}
    </Dialog>
  );
};
