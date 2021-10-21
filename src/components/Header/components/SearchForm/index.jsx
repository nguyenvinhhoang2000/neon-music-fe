import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "./style.scss";
import { useRef } from "react";

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
  onSubmit: null,
};

function SearchForm(props) {
  const { onSubmit } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  const handleUnFocus = () => {
    setFocus(!focus);
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  };

  return (
    <>
      <form className='search' action=''>
        <div
          className={focus ? "search__container is-focus" : "search__container"}
        >
          <SearchIcon />

          <div className='input-wrapper'>
            <input
              type='text'
              value={searchTerm}
              className='z-input-placeholder'
              placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV...'
              onChange={handleSearchTermChange}
              onFocus={handleFocus}
              onBlur={handleUnFocus}
            />
          </div>
        </div>

        {focus && (
          <ul className='suggest__list'>
            <li className='suggest__item'>
              <SearchIcon />
              <span>Vo Tinh</span>
            </li>
          </ul>
        )}
      </form>
    </>
  );
}

export default SearchForm;
