const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();

const privateKeys = [process.env.PRIVATE_KEY];

console.log("PRIVATE_KEY", process.env.PRIVATE_KEY);
console.log("INFURA_API_KEY", process.env.INFURA_API_KEY);

module.exports = {
  networks: {
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys,
          "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY
        );
      },
      network_id: 4,
    },
  },
  compilers: {
    solc: {
      version: "0.8.2",
      parser: "solcjs",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
