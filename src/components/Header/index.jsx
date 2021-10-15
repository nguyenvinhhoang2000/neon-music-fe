import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchForm from "./components/SearchForm";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

Header.propTypes = {};

function Header(props) {
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
          <SearchForm />
        </div>

        <div className='level-right'>
          <div className='setting-item'>
            <button className='zm-btn button'>
              <DarkModeIcon />
            </button>
          </div>
          <div className='setting-item'>
            <button className='zm-btn button'>
              <FileUploadOutlinedIcon />
            </button>
          </div>
          <div className='setting-item'>
            <button className='zm-btn button'>
              <SettingsOutlinedIcon />
            </button>
          </div>
          <div className='zm-avatar-frame'>
            <figure className='is-38x38 is-rounded'>
              <img
                src='https://s120-ava-talk.zadn.vn/5/c/5/5/2/120/045d9c0decb5452a962b2e0587d0142d.jpg'
                alt=''
              />
            </figure>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
