import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserLoginThunk,
  logoutThunk,
} from "../redux/slices/UserInfoSlice";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const dispatch = useDispatch();

  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );

  const userName = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.userInfo.username
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    dispatch(checkUserLoginThunk());
  }, []);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECORD
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
              <Button
                onClick={() => {
                  if (!isLogin) {
                    setLoginOpen(!loginOpen);
                  }
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {isLogin ? userName : "Login/Signup"}
              </Button>
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
                onClick={() => {
                  dispatch(logoutThunk());
                  handleCloseNavMenu();
                }}
              >
                Logout
              </Button>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECORD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                if (!isLogin) {
                  setLoginOpen(!loginOpen);
                }
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {isLogin ? userName : "Login/Signup"}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                dispatch(logoutThunk());
              }}
            >
              Logout
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Login/Signup</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </AppBar>
  );
};

export default Navbar;
