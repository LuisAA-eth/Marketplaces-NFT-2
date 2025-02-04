"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMetaMask } from "@/hooks/useMetamask";
import useBuyNFT from "@/hooks/marketplace/useBuyNFT";
import { useTokenPrice } from "@/hooks/marketplace/useTokenPrice";
import { useGetAvailableNfts } from "@/hooks/marketplace/useGetAvailableNfts";
import NFTItem from "./NFTItem";

const Marketplace: React.FC = () => {
  const { isConnected } = useMetaMask();
  const { availableNFTs, tokenError: availableNftsError } =
    useGetAvailableNfts();
  const [nftPrice, setNftPrice] = useState<string>("");
  const { tokenError, getPrice } = useTokenPrice();

  const { buy, error: buyError, getBuyNFT } = useBuyNFT();

  useEffect(() => {
    const fetchNFTPrice = async () => {
      try {
        const { price } = await getPrice();
        setNftPrice(ethers.formatEther(price));
      } catch (error) {
        console.error("Error fetching NFT price:", error);
      }
    };

    fetchNFTPrice();
  }, [getPrice]);

  const handleBuyNFT = async (tokenId: number) => {
    if (!isConnected) {
      alert("Conecta tu wallet primero.");
      return;
    }

    try {
      await getBuyNFT(tokenId, nftPrice);
    } catch (err) {
      console.error(err);
    }

    if (buyError) {
      alert(`Error al comprar el NFT: ${buyError}`);
    } else if (buy) {
      alert(`¡NFT #${tokenId} comprado con éxito!`);
    }
  };

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4">Marketplace de NFTs</Typography>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        Precio de cada NFT: {nftPrice} ETH
      </Typography>
      {availableNftsError && (
        <Typography color="error">
          Error al cargar NFTs: {availableNftsError}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {availableNFTs.length > 0 ? (
          availableNFTs.map((tokenId) => (
            <NFTItem
              key={tokenId}
              tokenId={tokenId}
              handleBuyNFT={handleBuyNFT}
            />
          ))
        ) : (
          <Typography variant="body1">
            No hay NFTs disponibles en este momento.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Marketplace;
