import { useState, useCallback } from "react";
import useInitConquerNFT from "./initConquerNFT";

interface UseBalanceProps {
  tokenId: number;
}

export function useGetTokenURI({ tokenId }: UseBalanceProps) {
  const [uri, setUri] = useState<string>("");
  const [tokenError, setTokenError] = useState<string | null>(null);

  const { nftContract, error: contractError } = useInitConquerNFT();

  const getTokenURI = useCallback(async () => {
    if (!nftContract) {
      setTokenError("Token contract not loaded.");
      return;
    }

    setTokenError(null);

    try {
      const tokenUri = await nftContract.tokenURI(tokenId);

      setUri(tokenUri);
    } catch (err: any) {
      setTokenError(err.message || "Failed to fetch owner address.");
      console.error("Error fetching owner:", err);
    }
  }, [nftContract]);

  return { getTokenURI, uri, tokenError };
}
