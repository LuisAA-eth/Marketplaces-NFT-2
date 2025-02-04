import React from "react";
import AddNFTComponent from "../components/admin/AddNFT";
import SetNFTPriceComponent from "../components/admin/SetNFTPrice";
import SetRewardTokensComponent from "../components/admin/SetRewardTokens";
import WithdrawComponent from "../components/admin/WithdrawComponents";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AdminPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        gap: 3, // Espaciado entre el título y los componentes
      }}
    >
      {/* Encabezado de Gestión de Administración */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Gestión de Administración
      </Typography>

      {/* Contenedor con los componentes en fila */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3, // Espaciado entre los componentes
        }}
      >
        <AddNFTComponent />
        <SetNFTPriceComponent />
        <SetRewardTokensComponent />
        <WithdrawComponent />
      </Box>
    </Box>
  );
};

export default AdminPage;

