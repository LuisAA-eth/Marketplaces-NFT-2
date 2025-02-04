import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ConquerNFT__factory } from "@/typechain-types";
const useInitConquerNFT = () => {
  const [nftContract, setNftContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);
  const contractAddress = process.env.NEXT_PUBLIC_CONQUER_NFT_ADDR;

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
        const contractABI = ConquerNFT__factory.abi;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer ?? provider
        );
        setNftContract(contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
        setError("Failed to initialize contract.");
      }
    }

    initContract();
  }, [contractAddress]);

  return { nftContract, error };
};

export default useInitConquerNFT;
