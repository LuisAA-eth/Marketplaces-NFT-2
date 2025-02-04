import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useGetTokenURI } from "@/hooks/marketplace/useGetTokenURI";

// Helper para resolver enlaces de IPFS
const resolveIPFS = (ipfsUrl: string) => {
  if (ipfsUrl && ipfsUrl.startsWith("ipfs://")) {
    return `https://gateway.pinata.cloud/ipfs/${ipfsUrl.slice(7)}`;
  }
  return ipfsUrl;
};

interface NFTItemProps {
  tokenId: number;
  handleBuyNFT: (tokenId: number) => void;
}

const NFTItem: React.FC<NFTItemProps> = ({ tokenId, handleBuyNFT }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { getTokenURI, uri, tokenError } = useGetTokenURI({ tokenId });

  useEffect(() => {
    const fetchNFTImage = async () => {
      try {
        await getTokenURI();
        if (uri) {
          const resolvedUri = resolveIPFS(uri);
          setImageUrl(resolvedUri);
        }
      } catch (error) {
        console.error(
          `Error al obtener metadata para tokenId ${tokenId}:`,
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNFTImage();
  }, [uri, getTokenURI, tokenId]);

  return (
    <Box
      sx={{
        border: "1px solid grey",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "8px",
        maxWidth: "300px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        {tokenId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={`NFT ${tokenId}`}
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            marginBottom: "1rem",
          }} // Ajustamos imagen al 100% del contenedor
        />
      ) : (
        <Typography variant="body2">No se pudo cargar la imagen.</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleBuyNFT(tokenId)}
          sx={{ marginTop: "1rem" }}
        >
          Comprar
        </Button>
      </Box>
    </Box>
  );
};

export default NFTItem;
