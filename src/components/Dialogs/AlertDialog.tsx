import React from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import { useRootSelector } from "../../store/utils";
import { useDispatch } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { getAlert } from "../../store/Dialogs/dialogs.selector";
import { hideAlert } from "../../store/Dialogs/dialogs.slide";
import { Transition } from "./DialogTransition";
import { AlertType } from "../../store/Dialogs/dialogs.model";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      padding: theme.spacing(2, 2, 2, 3),
      color: theme.palette.text.secondary,
      backgroundColor: "rgba(0,0,0,.8)",
    },
    dialogContent: {
      padding: theme.spacing(2, 2, 2, 2),
    },
    dialogText: {
      color: theme.palette.text.primary,
    },
    dialogActions: {
      padding: theme.spacing(1, 3, 1, 1),
    },
    icon: {
      fontSize: 32,
      verticalAlign: "center",
    },
    successIcon: {
      color: "rgb(0,255,0)",
    },
    warningIcon: {
      color: "rgb(255,255,0)",
    },
    errorIcon: {
      color: "rgb(255,0,0)",
    },
  })
);

const AlertTitleIcon = ({ type }: { type: AlertType }) => {
  const styles = useStyles();
  switch (type) {
    case AlertType.success:
      return (
        <CheckCircleIcon
          className={[styles.icon, styles.successIcon].join(" ")}
        />
      );
    case AlertType.warning:
      return (
        <WarningIcon className={[styles.icon, styles.warningIcon].join(" ")} />
      );
    case AlertType.error:
      return (
        <ErrorIcon className={[styles.icon, styles.errorIcon].join(" ")} />
      );
  }
  return null;
};

export const AlertDialog = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const alert = useRootSelector(getAlert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  if (!alert) return null;

  return (
    <Dialog open={true} TransitionComponent={Transition}>
      <DialogTitle className={styles.dialogTitle}>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item alignItems="center" style={{ display: "flex" }}>
            <AlertTitleIcon type={alert.type} />
          </Grid>
          <Grid item>{alert.title}</Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers className={styles.dialogContent}>
        <DialogContentText className={styles.dialogText}>
          {alert.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button variant="contained" onClick={handleClose} color="secondary">
          ACCEPT
        </Button>
      </DialogActions>
    </Dialog>
  );
};
