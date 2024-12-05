import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const ConnectWalletPage: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the wallet is already connected when the page loads
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (err) {
          console.error('Error fetching accounts:', err);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      navigate('/registration'); // Redirect to Registration Page
    } else {
      alert('Please install MetaMask or Coinbase Wallet.');
    }
  };

  return (
    <div className="connect-wallet-container">
      <h2>Connect Your Wallet</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected: {walletAddress}</p>}
    </div>
  );
};

export default ConnectWalletPage;
