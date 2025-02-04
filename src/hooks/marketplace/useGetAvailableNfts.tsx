import { useState, useEffect } from "react";
import useInitMarketplace from "./initMarketplace";
import { ethers, BigNumberish } from "ethers";
import useInitConquerNFT from "./initConquerNFT";

export function useGetAvailableNfts() {
  const [availableNFTs, setAvailableNFTs] = useState<number[]>([]);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const { tokenContract, error: contractError } = useInitMarketplace();

  useEffect(() => {
    if (contractError) {
      setTokenError(contractError);
      return;
    }

    if (!tokenContract) {
      console.error("tokenContract no está disponible");
      return;
    }

    const fetchAvailableNFTs = async () => {
      try {
        const nfts: BigNumberish[] = await tokenContract.getAvailableNFTs();
        const nftIds = nfts.map((nft) => Number(ethers.toBigInt(nft)));
        setAvailableNFTs(nftIds);
      } catch (error: any) {
        console.error("Error al obtener los NFTs disponibles:", error);
        setTokenError(error.message || "Error fetching available NFTs");
      }
    };

    fetchAvailableNFTs();
  }, [tokenContract, contractError]);

  return { availableNFTs, tokenError };
}
