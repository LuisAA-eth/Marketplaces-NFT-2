// hooks/useMetaMask.ts

import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

interface UseMetaMaskResult {
  isConnected: boolean;
  account: string | null;
  connectMetaMask: () => Promise<void>;
  provider: ethers.BrowserProvider | null;
  error: string | null;
}

export const useMetaMask = (): UseMetaMaskResult => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        setIsConnected(false);
        setAccount(null);
      } else {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    };

    const detectProvider = async () => {
      const provider: any = await detectEthereumProvider();

      if (provider) {
        const ethersProvider = new ethers.BrowserProvider(provider);
        setProvider(ethersProvider);

        provider.on("accountsChanged", handleAccountsChanged);

        const accounts = await provider.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
          setAccount(null);
        }
      } else {
        setError("Please install MetaMask!");
      }
    };

    detectProvider();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const connectMetaMask = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
        console.log("ACCOUNT: ", account);
        const ethersProvider = new ethers.BrowserProvider(provider);
        setProvider(ethersProvider);
        setError(null);
      } catch (err: any) {
        console.error("User denied account access:", err);
        setError("User denied account access");
      }
    } else {
      setError("MetaMask not detected. Please install MetaMask.");
    }
  };

  return { isConnected, account, connectMetaMask, provider, error };
};
