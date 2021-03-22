import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import {useRootSelector} from "../../store/utils";
import {useDispatch} from "react-redux";
import {getIsCreatingGame} from "../../store/Game/game.selectors";
import {getNeedsRegister} from "../../store/Gambler/gambler.selector";
import {createGambler} from "../../store/Gambler/gambler.slide";

export const RegisterDialog = () => {
  const needsRegister = useRootSelector(getNeedsRegister);
  const isCreatingGame = useRootSelector(getIsCreatingGame);

  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");

  const handleRegistration = () => {
    dispatch(createGambler(name));
  };

  return (
    <Dialog open={needsRegister}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Join our friendly, ambitious, and competitive community
        </DialogContentText>
        <TextField
          required
          label="Name"
          placeholder="Enter your name here"
          variant="outlined"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isCreatingGame}
          onClick={handleRegistration}
          color="primary"
        >
          Sign Up
        </Button>
      </DialogActions>
      {isCreatingGame ? <LinearProgress/> : null}
    </Dialog>
  );
};
