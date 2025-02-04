import { useState, useCallback } from "react";
import useInitMarketplace from "./initMarketplace";

interface UseBalanceProps {
  tokenURI: string;
}

export function useAddNFTToMarketplace({ tokenURI }: UseBalanceProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { tokenContract, error: contractError } = useInitMarketplace();

  const addNFTToMarketplace = useCallback(async () => {
    if (!tokenContract) {
      setError("Token contract not loaded.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tx = await tokenContract.addNFTToMarketplace(tokenURI);
      await tx.wait();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to add NFT to marketplace.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [tokenContract, tokenURI]);

  return { addNFTToMarketplace, loading, error, success };
}
