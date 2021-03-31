import React from "react";
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { useRootSelector } from "../../store/utils";
import { getMetamaskInstalled } from "../../store/Gambler/gambler.selector";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Transition } from "./DialogTransition";
import { ReactComponent as MetamaskFoxIcon } from "../../images/metamask-fox.svg";

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
      padding: theme.spacing(2, 2, 3, 2),
    },
    dialogText: {
      padding: theme.spacing(2, 2, 2, 2),
      color: theme.palette.text.primary,
      textAlign: "center",
    },
    dialogActions: {
      padding: theme.spacing(1, 3, 1, 1),
      backgroundColor: "rgba(0,0,0,.8)",
    },
  })
);

export const MetamaskNotInstalledDialog = () => {
  const styles = useStyles();

  const isMetamaskInstalled = useRootSelector(getMetamaskInstalled);

  const handlePageReload = () => {
    window.location.reload();
  };

  return (
    <Dialog
      open={!isMetamaskInstalled}
      TransitionComponent={Transition}
      PaperProps={{ className: styles.dialog }}
    >
      <DialogContent className={styles.dialogContent}>
        <Typography className={styles.dialogText}>
          To use our dApp you need to have MetaMask installed, click the button
          bellow to install it.
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item container justify="center">
            <Button
              target="_blank"
              href="https://metamask.io/download"
              variant="contained"
              color="primary"
              size="large"
              startIcon={
                <SvgIcon
                  fontSize="large"
                  component={MetamaskFoxIcon}
                  viewBox="0 0 318.6 318.6"
                />
              }
            >
              Install MetaMask
            </Button>
          </Grid>
          <Grid item container justify="center">
            <Link onClick={handlePageReload}>I have already installed it</Link>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
