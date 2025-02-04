import { useState, useCallback } from "react";
import useInitMarketplace from "./initMarketplace";

interface TokenProperties {
  owner: string;
}

export function useOwnerOf() {
  const [owner, setOwner] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const { tokenContract, error: contractError } = useInitMarketplace();

  const getContractOwner = useCallback(async () => {
    if (!tokenContract) {
      setTokenError("Token contract not loaded.");
      return;
    }

    setTokenError(null);

    try {
      const ownerAddress = await tokenContract.owner();

      setOwner(ownerAddress);
    } catch (err: any) {
      setTokenError(err.message || "Failed to fetch owner address.");
      console.error("Error fetching owner:", err);
    }
  }, [tokenContract]);

  return { getContractOwner, owner, tokenError };
}
