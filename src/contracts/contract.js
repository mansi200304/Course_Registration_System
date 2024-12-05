import { ethers } from "ethers";
import abi from "./abi.json";

// Set up provider and signer (for example, from MetaMask)
const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "0x74e927a2b046733b1ba2d4918f8671e787ae5a239514287cc35e534da62c059"; // Your contract's deployed address
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

export default getContract;
