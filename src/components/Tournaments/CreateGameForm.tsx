import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { createGameDialogOpen } from "../../store/Dialogs/dialogs.slide";
import { useRootSelector } from "../../store/utils";
import { getIsCreatingGame } from "../../store/Game/game.selectors";

export const CreateGameForm: React.FC = () => {
  const dispatch = useDispatch();
  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const handleTournamentCreate = () => {
    dispatch(createGameDialogOpen());
  };

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={isCreatingGame}
      onClick={handleTournamentCreate}
    >
      Create new Game
    </Button>
  );
};
