import { useRootSelector } from "../store/utils";
import { getMetamaskInstalled } from "../store/Gambler/gambler.selector";
import { HomePage } from "./HomePage/HomePage";
import React from "react";

export const Pages: React.FC = () => {
  const isMetamaskInstalled = useRootSelector(getMetamaskInstalled);

  if (!isMetamaskInstalled) return null;

  return <HomePage />;
};
