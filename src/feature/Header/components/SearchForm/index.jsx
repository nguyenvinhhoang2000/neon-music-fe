import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";

SearchForm.propTypes = {};

function SearchForm(props) {
  return (
    <>
      <form className='search' action=''>
        <div className='search__container'>
          <button className='zm-btn button'>
            <SearchIcon />
          </button>

          <div className='input-wrapper'>
            <input
              type='text'
              className='form-control z-input-placeholder'
              placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
