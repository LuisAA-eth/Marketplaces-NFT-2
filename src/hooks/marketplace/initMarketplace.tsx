import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Marketplace__factory } from "@/typechain-types";

const useInitMarketplace = () => {
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const contractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;

  useEffect(() => {
    async function initContract() {
      if (!contractAddress) {
        setError("Contract address is not set");
        return;
      }

      let provider;
      let signer;

      if (window.ethereum == null) {
        provider = ethers.getDefaultProvider();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      }

      try {
        const contractABI = Marketplace__factory.abi;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer ?? provider
        );
        setTokenContract(contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
        setError("Failed to initialize contract.");
      }
    }

    initContract();
  }, [contractAddress]);

  return { tokenContract, error };
};

export default useInitMarketplace;
