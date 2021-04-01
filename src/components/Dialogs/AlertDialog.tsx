import React from "react";
import { useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useRootSelector } from "../../store/utils";
import { getAlert } from "../../store/Dialogs/dialogs.selector";
import { hideAlert } from "../../store/Dialogs/dialogs.slice";
import { Alert, AlertType } from "../../store/Dialogs/dialogs.model";

function MuiAlertStyled(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getAlertSeverity(alert: Alert) {
  if (alert.type === AlertType.success) return "success";
  if (alert.type === AlertType.warning) return "warning";
  return "error";
}

export const AlertDialog = () => {
  const dispatch = useDispatch();

  const alert = useRootSelector(getAlert);

  const handleClose = () => {
    dispatch(hideAlert());
  };

  if (!alert) return null;

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={handleClose}
    >
      <MuiAlertStyled severity={getAlertSeverity(alert)} onClose={handleClose}>
        {alert.message}
      </MuiAlertStyled>
    </Snackbar>
  );
};
