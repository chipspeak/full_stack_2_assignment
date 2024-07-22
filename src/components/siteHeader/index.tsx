import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Squash as Hamburger } from "hamburger-react"; // helpful link here: https://www.freecodecamp.org/news/how-to-create-an-animated-hamburger-menu-in-react/
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const styles = {
  title: {
    flexGrow: 1,
  },
  menuItem: {
    color: "white",
  },
  activeMenuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

// Offset for the toolbar/header
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Menu options for the hamburger menu
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/movies/playlist" },
    { label: "Upcoming", path: "/upcoming" },
    { label: "Top Rated", path: "/top" },
    { label: "TV Shows", path: "/tv" },
    { label: "TV Favorites", path: "/tvshows/favourites" },
  ];

  // Handle opening the hamburger menu
  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setMenuOpen(false); // Close the menu after selecting an option
  };

  // Handle closing the hamburger menu via an external click
  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "#1a1a1a", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB
          </Typography>

          {isMobile ? (
            <>
              <Hamburger
                toggled={menuOpen}
                toggle={handleHamburgerClick}
                size={24}
                color="white"
                duration={0.5}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                slotProps={{
                  paper: {
                    style: {
                      backgroundColor: "#1a1a1a",
                    },
                  },
                }}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={
                      location.pathname === opt.path
                        ? { ...styles.menuItem, ...styles.activeMenuItem }
                        : styles.menuItem
                    }
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={
                    location.pathname === opt.path
                      ? styles.activeMenuItem
                      : undefined
                  }
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
