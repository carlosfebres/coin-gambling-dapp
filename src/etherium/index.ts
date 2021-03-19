import { ethers } from "ethers";
import TournamentABI from "./contracts/TournamentABI.json";
import GameABI from "./contracts/GameABI.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const {ethereum} = window as any;
ethereum.enable();

export const provider = new ethers.providers.Web3Provider(ethereum);
export const signer = provider.getSigner();
export const tournament = new ethers.Contract(contractAddress, TournamentABI, signer);

console.log({ provider, signer, tournament });

export function getGameContract(address: string) {
  return new ethers.Contract(address, GameABI, signer);
}
