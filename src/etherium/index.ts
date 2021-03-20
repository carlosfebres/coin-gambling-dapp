import { ethers } from "ethers";
import TournamentABI from "./contracts/TournamentABI.json";
import GameABI from "./contracts/GameABI.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const { ethereum } = window as any;
ethereum.enable();

export const provider = new ethers.providers.Web3Provider(ethereum);
export const signer = provider.getSigner();
export const tournament = new ethers.Contract(
  contractAddress,
  TournamentABI,
  signer
);

console.log({ provider, signer, tournament });

export function getGameContract(address: string) {
  return new ethers.Contract(address, GameABI, signer);
}
