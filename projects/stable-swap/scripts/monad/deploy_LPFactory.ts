import { ethers, run, network } from "hardhat";

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  if (networkName === "monadTestnet" || networkName === "monadMainnet") {
    console.log(`Deploying to ${networkName} network...`);

    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    const QubeStableSwapLPFactory = await ethers.getContractFactory("QubeStableSwapLPFactory");
    const qubeStableSwapLPFactory = await QubeStableSwapLPFactory.deploy();
    await qubeStableSwapLPFactory.deployed();

    console.log("qubeStableSwapLPFactory deployed to:", qubeStableSwapLPFactory.address);
	
	await run('verify:verify', { address: qubeStableSwapLPFactory.address });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
