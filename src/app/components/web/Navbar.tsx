"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Image from "next/image";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useOwnerOf } from "@/hooks/marketplace/useOwnerOf";
import useConnectedAccount from "@/hooks/getConnectedAccount";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Mis NFTs", path: "/mis-nfts" },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { connectedAddress } = useConnectedAccount();

  const { getContractOwner, owner, tokenError } = useOwnerOf();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        await getContractOwner(); // Llamamos a la función para obtener el owner
        console.log("Owner fetched");
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };

    fetchOwner(); // Ejecuta la llamada al montar el componente
  }, [getContractOwner]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CONQUERBLOCKS MARKETPLACE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {owner && connectedAddress && owner === connectedAddress && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/admin"
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary="Gestión del Marketplace" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "grey.900" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Image
            src="/logo_conquer.png"
            alt="Logo Conquer Blocks"
            width={40}
            height={40}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CONQUERBLOCKS MARKETPLACE
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, ml: "auto" }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.path}
                sx={{ color: "#fff" }}
              >
                {item.label}
              </Button>
            ))}
            {owner && connectedAddress && owner === connectedAddress && (
              <Button component={Link} href="/admin" sx={{ color: "#fff" }}>
                Gestión del Marketplace
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
