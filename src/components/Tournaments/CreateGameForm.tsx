import React from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../../store/Game/game.slide";
import { useRootSelector } from "../../store/utils";
import { getIsCreatingGame } from "../../store/Game/game.selectors";
import { Button } from "@material-ui/core";

export const CreateGameForm: React.FC = () => {
  const dispatch = useDispatch();
  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const handleTournamentCreate = () => {
    dispatch(createGame());
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isCreatingGame}
      onClick={handleTournamentCreate}
    >
      Create new Game
    </Button>
  );
};
