import { useState, useCallback } from "react";
import { ethers } from "ethers";
import useInitMarketplace from "./initMarketplace";

export function useSetNFTPrice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { tokenContract, error: contractError } = useInitMarketplace();

  const setNFTPrice = useCallback(
    async (price: number) => {
      if (!tokenContract) {
        setError("Token contract not loaded.");
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const tx = await tokenContract.setNftPrice(
          ethers.parseEther(price.toString())
        );
        await tx.wait();
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || "Failed to set NFT price.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [tokenContract]
  );

  return { setNFTPrice, loading, error, success };
}
