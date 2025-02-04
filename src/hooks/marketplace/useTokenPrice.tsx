import { useState, useCallback, useEffect } from "react";
import useInitMarketplace from "./initMarketplace";

interface TokenProperties {
  price: bigint;
}

export function useTokenPrice() {
  const [tokenError, setTokenError] = useState<string | null>(null);
  const { tokenContract, error: contractError } = useInitMarketplace();

  useEffect(() => {
    if (contractError) {
      setTokenError(contractError);
    }
  }, [contractError]);

  const getPrice = useCallback(async (): Promise<TokenProperties> => {
    if (!tokenContract) {
      setTokenError("Token contract not loaded.");

      return { price: BigInt(0) };
    }

    try {
      const tokenPrice = await tokenContract.nftPrice();

      setTokenError(null);

      return { price: tokenPrice };
    } catch (err: any) {
      setTokenError(err.message || "Failed to fetch the balance.");
      return { price: BigInt(0) };
    }
  }, [tokenContract]);

  return { tokenError, getPrice };
}
