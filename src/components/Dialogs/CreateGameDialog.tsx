import React, { useState } from "react";
import {
  Button,
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
import { createGameDialogClose } from "../../store/Dialogs/dialogs.slide";
import { CurrencyInput } from "../Inputs/CurrencyInput";
import { getIsCreatingGame } from "../../store/Game/game.selectors";
import { createGame } from "../../store/Game/game.slide";

export const CreateGameDialog = () => {
  const isCreateGameDialogOpen = useRootSelector(getIsCreateGameDialogOpen);
  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const dispatch = useDispatch();
  const [betAmount, setBetAmount] = useState<string>("0");

  const handleClose = () => dispatch(createGameDialogClose());
  const handleCreation = () => {
    dispatch(createGame(betAmount));
  };

  return (
    <Dialog open={isCreateGameDialogOpen} onClose={handleClose}>
      <DialogTitle>Create Game</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a game to bet with some player, having a 50/50 provability of
          winning (or losing :D).
        </DialogContentText>
        <CurrencyInput
          disabled={isCreatingGame}
          onChange={(total) => setBetAmount(total)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isCreatingGame} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
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
