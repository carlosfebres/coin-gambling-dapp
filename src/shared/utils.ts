import { Game } from "../store/Game/game.models";

export function formatEthersReturnMessage(message: string) {
  const errorPrefixes = [
    "VM Exception while processing transaction: revert ",
    "MetaMask Tx Signature: ",
  ];
  const errorPrefix = errorPrefixes.find((error) => message.includes(error));
  if (!errorPrefix) return "Unexpected error";
  const index = message.indexOf(errorPrefix);
  if (index < 0) return message;
  return message.substr(index + errorPrefix.length);
}

export function formatShortAddress(address: string) {
  const first5 = address.substr(0, 5);
  const last4 = address.substr(-4);
  return `${first5}...${last4}`;
}

export function isGamblerWinner(game: Game, gamblerAddress: string) {
  return game.winner === gamblerAddress;
}
