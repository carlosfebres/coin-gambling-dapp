import React from "react";
import { CreateGameDialog } from "./CreateGameDialog";
import { RegisterDialog } from "./RegisterDialog";
import { AlertDialog } from "./AlertDialog";
import { WithdrawConfirmationDialog } from "./WithdrawConfirmationDialog";
import { ConnectWalletDialog } from "./ConnectWalletDialog";
import { MetamaskNotInstalledDialog } from "./MetamaskNotInstalledDialog";

export const DialogsContainer = () => {
  return (
    <>
      <CreateGameDialog />
      <RegisterDialog />
      <WithdrawConfirmationDialog />
      <ConnectWalletDialog />
      <MetamaskNotInstalledDialog />
      <AlertDialog />
    </>
  );
};
