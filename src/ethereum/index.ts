import { ethers } from "ethers";
import { abi as CasinoABI } from "./contracts/Casino.json";
import { abi as GameABI } from "./contracts/Game.json";
import { abi as GamblerABI } from "./contracts/Gambler.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

export function getEthereum() {
  const { ethereum } = window as any;
  return ethereum;
}

const ethereum = getEthereum();

export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let casino: ethers.Contract;

if (ethereum) {
  provider = new ethers.providers.Web3Provider(ethereum, "any");
  signer = provider.getSigner();
  casino = new ethers.Contract(contractAddress, CasinoABI, signer);
}

export function getGameContract(address: string) {
  return new ethers.Contract(address, GameABI, signer);
}

export function getGamblerContract(address: string) {
  return new ethers.Contract(address, GamblerABI, signer);
}

export function ethersConnectWallet() {
  return ethereum.request({ method: "eth_requestAccounts" });
}
