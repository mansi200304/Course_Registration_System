import { ethers } from "ethers";

// Define the local network URL (assuming you're using a local blockchain like Hardhat)
const LOCAL_NETWORK_URL = "http://localhost:3000";

// The ABI of your contract (simplified for the example)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "studentAddress",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "courseName",
            "type": "string"
        }
    ],
    "name": "CourseRegistered",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "studentAddress",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "email",
            "type": "string"
        }
    ],
    "name": "StudentRegistered",
    "type": "event"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_professor",
            "type": "address"
        }
    ],
    "name": "addProfessor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string[]",
            "name": "_selectedCourses",
            "type": "string[]"
        }
    ],
    "name": "registerCourses",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "_researchInterests",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_sop",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_researchProposal",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_professor",
            "type": "string"
        }
    ],
    "name": "registerForPhD",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "_name",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "_age",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "_dob",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_location",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_aadharCard",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "_abaCredits",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "_email",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_phoneNumber",
            "type": "string"
        }
    ],
    "name": "signUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_student",
            "type": "address"
        }
    ],
    "name": "getStudentCourses",
    "outputs": [
        {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "_student",
            "type": "address"
        }
    ],
    "name": "getStudentData",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "age",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "dob",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "aadharCard",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "abaCredits",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "internalType": "string[]",
                    "name": "courses",
                    "type": "string[]"
                },
                {
                    "internalType": "bool",
                    "name": "registered",
                    "type": "bool"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "researchInterests",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "sop",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "researchProposal",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "professor",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct CourseRegistration.PhDApplication",
                    "name": "phdApplication",
                    "type": "tuple"
                }
            ],
            "internalType": "struct CourseRegistration.Student",
            "name": "",
            "type": "tuple"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "isProfessor",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "professorAddresses",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "studentAddresses",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "students",
    "outputs": [
        {
            "internalType": "string",
            "name": "name",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "dob",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "location",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "aadharCard",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "abaCredits",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "email",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
        },
        {
            "internalType": "bool",
            "name": "registered",
            "type": "bool"
        },
        {
            "components": [
                {
                    "internalType": "string",
                    "name": "researchInterests",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "sop",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "researchProposal",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "professor",
                    "type": "string"
                }
            ],
            "internalType": "struct CourseRegistration.PhDApplication",
            "name": "phdApplication",
            "type": "tuple"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
];

type ContractABI = Array<ethers.utils.Fragment>;

// Function to connect wallet (MetaMask or Coinbase Wallet)
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request account access (MetaMask, Coinbase, etc.)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const signer = provider.getSigner();
      const accounts = await signer.getAddress();
      
      // Fetching chainId using eth_chainId (Updated for MetaMask and Coinbase Wallet)
      const chainId = await provider.send('eth_chainId', []);
      console.log('Connected to chain ID:', chainId);

      return accounts; // Return the connected wallet address
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Please enable wallet access to connect.");
      return null;
    }
  } else {
    alert("Please install MetaMask or Coinbase Wallet.");
    return null;
  }
};

// Function to get contract instance
export const getContract = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Ethereum provider is not available. Please install a wallet like MetaMask or Coinbase Wallet.");
    return null;
  }

  // Initialize the provider using window.ethereum
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Replace with your contract's deployed address
  const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"; 

  // Create contract instance with the provided ABI and contract address
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};
export const checkNetwork = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    console.log('Connected to network:', network.name);
    return network;
  } else {
    alert("No Ethereum provider found");
    return null;
  }
};
