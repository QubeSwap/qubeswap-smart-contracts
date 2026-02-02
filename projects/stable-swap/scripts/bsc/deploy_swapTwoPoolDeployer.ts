import { ethers, run, network } from "hardhat";

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  if (networkName === "bscTestnet" || networkName === "bscMainnet") {
    console.log(`Deploying to ${networkName} network...`);

    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    const QubeStableSwapTwoPoolDeployer = await ethers.getContractFactory("QubeStableSwapTwoPoolDeployer");
    const qubeStableSwapTwoPoolDeployer = await QubeStableSwapTwoPoolDeployer.deploy();
    await qubeStableSwapTwoPoolDeployer.deployed();

    console.log("qubeStableSwapTwoPoolDeployer deployed to:", qubeStableSwapTwoPoolDeployer.address);
	
	await run('verify:verify', { address: qubeStableSwapTwoPoolDeployer.address });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
