import { ethers } from "hardhat";  // Importing ethers correctly

async function main() {
  // Get a signer from Hardhat
  const [deployer] = await ethers.getSigners();  // Get the deployer's account
  console.log("Deploying contracts with the account:", deployer.address);

  // Get contract factory
  const contractFactory = await ethers.getContractFactory("CourseRegistration");
  const contract = await contractFactory.deploy();
  console.log("Contract deployed at address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
