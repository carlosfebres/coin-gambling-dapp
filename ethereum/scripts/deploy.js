async function main() {
  await hre.run('compile');

  // We get the contract to deploy
  const Casino = await ethers.getContractFactory("Casino");
  const casino = await Casino.deploy();

  await casino.deployed();

  console.log("Casino contract deployed to:", casino.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
