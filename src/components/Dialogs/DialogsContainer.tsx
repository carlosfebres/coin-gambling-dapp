import React from "react";
import { CreateGameDialog } from "./CreateGameDialog";
import { RegisterDialog } from "./RegisterDialog";
import { AlertDialog } from "./AlertDialog";
import { WithdrawConfirmationDialog } from "./WithdrawConfirmationDialog";

export const DialogsContainer = () => {
  return (
    <>
      <CreateGameDialog />
      <RegisterDialog />
      <WithdrawConfirmationDialog />
      <AlertDialog />
    </>
  );
};
