import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Login from "feature/auth/components/Login";
import Register from "feature/auth/components/Register";
import { logout } from "feature/auth/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./components/SearchForm";
import "./style.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { resetFavoriteSong } from "feature/Container/pages/Personal/favoriteSongSlice";
import { Link } from "react-router-dom";
import songApi from "api/songApi";

Header.propTypes = {};

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

function Header(props) {
  const dispatch = useDispatch();
  const [listSong, setListSong] = useState([]);

  const loggedInUser = useSelector((state) => state.user.current);
  // const name = loggedInUser.name.split(" ");
  const isLoggedIn = !!loggedInUser.name;

  const handleFilterChange = async (newFilters) => {
    // setSearch(newFilters);

    const listSong = await songApi.search(newFilters);

    setListSong(listSong);
  };

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    dispatch(resetFavoriteSong());
    handleCloseMenu();
  };

  //---------MUI----------
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header className='header'>
      <div className='level'>
        <div className='level-left'>
          <button className='zm-btn button'>
            <ArrowBackIcon />
          </button>
          <button className='zm-btn button'>
            <ArrowForwardIcon />
          </button>
          <SearchForm onSubmit={handleFilterChange} listSong={listSong} />
        </div>

        <div className='level-right'>
          {!isLoggedIn && (
            <Button color='inherit' onClick={handleClickOpen}>
              Đăng nhập
            </Button>
          )}

          {isLoggedIn && (
            <>
              <Button
                id='basic-button'
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleClick}
              >
                {!!loggedInUser.avatar ? (
                  <img src={loggedInUser.avatar} alt='' />
                ) : (
                  <AccountCircleIcon />
                )}
                Hello, {loggedInUser.name.split(" ").splice(1, 2).join(" ")}!
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {/* <MenuItem onClick={handleCloseMenu}>
                  <Link to='my-account'>Tài Khoản của tôi</Link>
                </MenuItem> */}
                <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
              </Menu>
            </>
          )}
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <IconButton
            sx={{
              width: 40,
              margin: "0 0 0 auto",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            sx={{
              padding: "0 24px 8px 24px",
            }}
          >
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign='center'>
                  <Button
                    sx={{
                      color: "#7200a1",
                    }}
                    onClick={() => {
                      setMode(MODE.LOGIN);
                    }}
                  >
                    Đã có tài khoản? Đăng nhập tại đây!!!
                  </Button>
                </Box>
              </>
            )}

            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign='center'>
                  <Button
                    onClick={() => {
                      setMode(MODE.REGISTER);
                    }}
                    sx={{
                      color: "#7200a1",
                    }}
                  >
                    Chưa có tài khoản? Đăng kí tại đây!!!
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

export default Header;
