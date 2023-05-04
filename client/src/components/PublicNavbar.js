import React from "react";
import { useGlobalContext } from "../context";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/gym_logo.png"

const PublicNavbar = () => {
  const { user } = useGlobalContext();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <FitnessCenterIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          /> */}
          <img src={logo} width={40} className="logo" alt="4 tigers logo"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              /* letterSpacing: ".3rem", */
              color: "#e17b2a",
              textDecoration: "none",
            }}
          >
            4 TIGERS FITNESS GYM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "#e17b2a",
                    textAlign: "center",
                  }}
                  to="/"
                >
                  Home{" "}
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "#e17b2a",
                    textAlign: "center",
                  }}
                  to="/about"
                >
                  About Us{" "}
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  style={{
                    textDecoration: "none",
                    color: "#e17b2a",
                    textAlign: "center",
                  }}
                  to="/reviews"
                >
                  Reviews{" "}
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          {/* <FitnessCenterIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          /> */}
          {/* <img src={logo} width={40} alt="4 tigers logo"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              /*letterSpacing: ".3rem",*/
              color: "#e17b2a",
              textDecoration: "none",
            }}
          >
            4 TIGERS
          </Typography>

          {/* desktop mode */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              href="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              href="/about"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About Us
            </Button>
            <Button
              href="/reviews"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Reviews
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button href="/login" color="inherit" variant="outlined">
              {user ? "Dashboard" : "Login"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicNavbar;
