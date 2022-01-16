import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "./style.scss";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addSongList } from "feature/PlayerControl/playControlSlice";

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  listSong: PropTypes.array,
};

SearchForm.defaultProps = {
  onSubmit: null,
  listSong: [],
};

function SearchForm(props) {
  const { onSubmit, listSong } = props;

  const dispacth = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchNull, setSearchNull] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  const handleCloseSearchForm = () => {
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
        search: value,
      };
      if (formValues.search !== "") {
        setSearchNull(true);
        onSubmit(formValues);
      } else {
        setSearchNull(!searchNull);
      }
    }, 300);
  };

  //func
  const handleClick = (value) => {
    const action = addSongList(value);
    dispacth(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className='search' onSubmit={handleSubmit}>
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
            />
          </div>
        </div>

        {focus &&
          (searchNull ? (
            <>
              <div
                className='close-search-form'
                onClick={handleCloseSearchForm}
              ></div>
              <ul className='list-song-search'>
                {listSong.map((listsong) => (
                  <li key={listsong?._id} className='list-song-search__item'>
                    <img
                      onClick={handleClick}
                      className='img'
                      src={listsong?.img_song}
                      alt={listsong?.name_song}
                    />
                    <div onClick={() => handleClick(listsong)} className='info'>
                      <p>{listsong?.name_song}</p>
                      <span>{listsong?.name_singer}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div
                className='close-search-form'
                onClick={handleCloseSearchForm}
              ></div>
              <ul className='suggest__list'>
                {/* <li className='suggest__item'>
                  <SearchIcon />
                  <span>Vo Tinh</span>
                </li> */}
              </ul>
            </>
          ))}
      </form>
    </>
  );
}

export default SearchForm;
