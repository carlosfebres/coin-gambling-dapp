import React from "react";
import { useDispatch } from "react-redux";
import { setCreateGameDialog } from "../../store/Dialogs/dialogs.slide";
import { useRootSelector } from "../../store/utils";
import { getIsCreatingGame } from "../../store/Game/game.selectors";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
  })
);

export const CreateGameFabButton: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const handleGameCreation = () => {
    dispatch(setCreateGameDialog(true));
  };

  return (
    <Fab
      color="secondary"
      aria-label="add"
      className={classes.fabButton}
      disabled={isCreatingGame}
      onClick={handleGameCreation}
    >
      <AddIcon />
    </Fab>
  );
};
