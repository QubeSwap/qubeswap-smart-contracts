import { ethers, run, network } from "hardhat";
import config from "../../config";

async function main() {
  // Get network data from Hardhat config (see hardhat.config.ts).
  const networkName = network.name;
  // Check if the network is supported.
  if (networkName === "avaxTestnet" || networkName === "avaxMainnet") {
    console.log(`Deploying to ${networkName} network...`);

    // Compile contracts.
    await run("compile");
    console.log("Compiled contracts...");

    const QubeStableSwapInfo = await ethers.getContractFactory("QubeStableSwapInfo");
    const qubeStableSwapInfo = await QubeStableSwapInfo.deploy(
      config.TwoPoolInfo[networkName],
      config.ThreePoolInfo[networkName]
    );
    await qubeStableSwapInfo.deployed();

    console.log("qubeStableSwapInfo deployed to:", qubeStableSwapInfo.address);
	
	const args = [config.TwoPoolInfo[networkName], config.ThreePoolInfo[networkName]];
	
	await run('verify:verify', { address: qubeStableSwapInfo.address, constructorArguments: args});
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
