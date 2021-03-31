import {HardhatUserConfig} from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";

const config: HardhatUserConfig = {
  solidity: "0.8.3",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {},
  },
};
export default config;
