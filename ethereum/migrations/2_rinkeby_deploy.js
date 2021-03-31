const casino = artifacts.require("casino");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(casino, { from: accounts[0] });
};
