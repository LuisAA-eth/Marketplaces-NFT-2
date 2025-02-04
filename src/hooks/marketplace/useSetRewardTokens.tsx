import { useState, useCallback } from "react";
import useInitMarketplace from "./initMarketplace";

export function useSetRewardTokens() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { tokenContract, error: contractError } = useInitMarketplace();

  const setRewardTokens = useCallback(
    async (tokens: number) => {
      if (!tokenContract) {
        setError("Token contract not loaded.");
        return;
      }

      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const tx = await tokenContract.setRewardTokens(tokens);
        await tx.wait();
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || "Failed to set reward tokens.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [tokenContract]
  );

  return { setRewardTokens, loading, error, success };
}
