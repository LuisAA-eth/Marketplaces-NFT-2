// components/WithdrawComponent.tsx
"use client";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useWithdraw } from "@/hooks/marketplace/useWithdraw";

const WithdrawComponent: React.FC = () => {
  const { withdraw, loading, error, success } = useWithdraw();

  const handleWithdraw = () => {
    withdraw();
  };

  useEffect(() => {
    if (success) {
      alert("Fondos retirados exitosamente");
    }
  }, [success]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        border: "1px solid grey",
        borderRadius: "8px",
        width: "300px", // Ancho fijo para consistencia
        maxWidth: "400px",
        flex: "1", // Flex para alinear horizontalmente
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Retirar Fondos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" onClick={handleWithdraw}>
          Retirar
        </Button>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default WithdrawComponent;
