import React from "react";
import { CreateGameDialog } from "./CreateGameDialog";
import { RegisterDialog } from "./RegisterDialog";
import {AlertDialog} from "./AlertDialog";

export const DialogsContainer = () => {
  return (
    <>
      <CreateGameDialog />
      <RegisterDialog />
      <AlertDialog />
    </>
  );
};
