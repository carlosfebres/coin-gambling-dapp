import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";

import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";

dotenv.config();

const accounts = [process.env.ACCOUNT_PRIVATE_KEY as string];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY,
      accounts,
    },
  },
  typechain: {
    outDir: "../src/ethereum/interfaces",
    target: "ethers-v5",
  },
};
export default config;
