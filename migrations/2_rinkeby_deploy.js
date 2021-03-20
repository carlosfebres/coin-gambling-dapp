const tournament = artifacts.require("tournament");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(tournament, { from: accounts[0] });
};
