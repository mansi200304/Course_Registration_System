import { ethers } from 'ethers';

// This function ensures the address is in the correct format (with checksum)
export const validateAddress = (address) => {
  try {
    return ethers.utils.getAddress(address); // Normalizes and checksums address
  } catch (error) {
    throw new Error("Invalid Ethereum address format");
  }
};
