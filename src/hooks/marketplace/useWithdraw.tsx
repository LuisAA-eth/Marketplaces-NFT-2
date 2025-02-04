import { useState, useCallback } from "react";
import useInitMarketplace from "./initMarketplace";

export function useWithdraw() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { tokenContract, error: contractError } = useInitMarketplace();

  const withdraw = useCallback(async () => {
    if (!tokenContract) {
      setError("Token contract not loaded.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tx = await tokenContract.withdraw();
      await tx.wait();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to withdraw funds.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [tokenContract]);

  return { withdraw, loading, error, success };
}
