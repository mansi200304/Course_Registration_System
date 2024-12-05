import { ethers } from "ethers";
import { getContract } from './web3';

// Function to register courses
export const registerCourse = async (
  selectedCourses: string[], 
  walletAddress: string
): Promise<{ success: boolean, message: string }> => {
  try {
    // Get contract instance
    const contract = await getContract();

    if (!contract) {
      return { success: false, message: "Contract not found." };
    }

    // Interact with the contract to register courses
    const transaction = await contract.registerCourses(selectedCourses, {
      from: walletAddress, // Send transaction from the user's wallet
    });

    // Wait for transaction to be mined and confirmed
    const receipt = await transaction.wait();
    
    // Check if the transaction was successful
    if (receipt.status === 1) {
      return { success: true, message: "Course registration successful!" };
    } else {
      return { success: false, message: "Transaction failed." };
    }
  } catch (error) {
    console.error("Error during course registration:", error);
    
    // Returning error message for UI feedback
    return {
      success: false,
      message: `Failed to register courses. Please try again. ${error.message}`,
    };
  }
};
