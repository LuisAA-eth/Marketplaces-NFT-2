import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { Marketplace__factory } from "@/typechain-types";
import useInitMarketplace from "./initMarketplace";

const useBuyNFT = () => {
  const [buy, setBuy] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { tokenContract, error: contractError } = useInitMarketplace();

  useEffect(() => {
    if (contractError) {
      setError(contractError);
    }
  }, [contractError]);

  const getBuyNFT = useCallback(
    async (tokenId: number, nftPrice: string) => {
      if (!tokenContract) {
        setError("Token contract not loaded");
        return;
      }

      if (tokenId === null || tokenId === undefined || isNaN(tokenId)) {
        setError("Invalid tokenId provided");
        return;
      }

      try {
        const valueInWei = ethers.parseEther(nftPrice);

        const buyValue = await tokenContract.buyConquerNFT(tokenId, {
          value: valueInWei,
        });

        const txReceipt = await buyValue.wait();

        if (txReceipt.status === 1) {
          setBuy(true);
          setError(null);
        } else {
          setBuy(false);
          setError("Transaction failed");
        }
      } catch (err: any) {
        setError("Error processing transaction");
        console.error(err);
      }
    },
    [tokenContract]
  );

  return { buy, error, getBuyNFT };
};

export default useBuyNFT;
