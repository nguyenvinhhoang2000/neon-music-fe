import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchForm from "./components/SearchForm";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import { IconButton } from "@mui/material";

import Close from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core";
import Register from "feature/auth/components/Register";
import Login from "feature/auth/components/Login";

Header.propTypes = {};

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

function Header(props) {
  const classes = useStyles();

  const handleFilterChange = (newFilters) => {};

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <SearchForm onSubmit={handleFilterChange} />
        </div>

        <div className='level-right'>
          <div className='zm-avatar-frame'>
            <button className='zm-btn' onClick={handleClickOpen}>
              Đăng nhập
            </button>
          </div>
        </div>

        <Dialog
          disableEscapeKeyDown
          disableBackdropClick
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <Close />
          </IconButton>

          <DialogContent>
            {mode === MODE.REGISTER && (
              <>
                <Register closeDialog={handleClose} />
                <Box textAlign='center'>
                  <Button
                    color='primary'
                    onClick={() => {
                      setMode(MODE.LOGIN);
                    }}
                  >
                    Alredy have an account? Login here
                  </Button>
                </Box>
              </>
            )}

            {mode === MODE.LOGIN && (
              <>
                <Login closeDialog={handleClose} />
                <Box textAlign='center'>
                  <Button
                    color='primary'
                    onClick={() => {
                      setMode(MODE.REGISTER);
                    }}
                  >
                    Don't have an account? Register here
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
