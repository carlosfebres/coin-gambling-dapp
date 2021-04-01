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
  TextField,
  withStyles,
} from "@material-ui/core";
import { useRootSelector } from "../../store/utils";
import { useDispatch } from "react-redux";
import {
  getCreatingGambler,
  getNeedsRegister,
} from "../../store/Gambler/gambler.selector";
import { createGambler } from "../../store/Gambler/gambler.slice";
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

const TextFieldStyled = withStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      color: theme.palette.text.primary,
    },
  },
}))(TextField);

export const RegisterDialog = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const needsRegister = useRootSelector(getNeedsRegister);
  const isCreatingGambler = useRootSelector(getCreatingGambler);

  const [isValid, setValid] = useState(true);
  const [name, setName] = useState<string>("");

  const handleRegistration = () => {
    if (!name) {
      setValid(false);
      return;
    }
    dispatch(createGambler(name));
  };

  const handleNameChanged = (value: string) => {
    setValid(Boolean(value));
    if (value.length < 32) setName(value);
  };

  return (
    <Dialog
      open={needsRegister}
      TransitionComponent={Transition}
      PaperProps={{ className: styles.dialog }}
    >
      <DialogTitle className={styles.dialogTitle}>Register</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <DialogContentText className={styles.dialogText}>
          Join our friendly, ambitious, and competitive community
        </DialogContentText>
        <TextFieldStyled
          fullWidth
          required
          disabled={isCreatingGambler}
          label="Name"
          placeholder="Enter your name here"
          variant="outlined"
          value={name}
          onChange={(evt) => handleNameChanged(evt.target.value)}
        />
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          variant="contained"
          disabled={isCreatingGambler || !isValid}
          onClick={handleRegistration}
          color="secondary"
        >
          Sign Up
        </Button>
      </DialogActions>
      {isCreatingGambler ? <LinearProgress /> : null}
    </Dialog>
  );
};
