import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackupIcon from "@mui/icons-material/Backup";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { addSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useState } from "react";
import {
  disLike,
  like,
  likeSong,
  playAllFavoriteSong,
} from "feature/Container/pages/Personal/favoriteSongSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import favoriteSong from "api/favoriteSong";
import { useEffect } from "react";

ListSong.propTypes = {
  songList: PropTypes.array,
};

function ListSong(props) {
  const { songList } = props;

  const dispatch = useDispatch();
  const songLiked = useSelector((state) => state.favoriteSong);

  const handleAddSong = (songlist, id) => {
    const action = addSongList(songlist);
    dispatch(action);
  };

  const handleClickPlayAll = () => {
    songList.map((x) => {
      const action = addSongList(x);
      dispatch(action);
    });
  };

  //---------------func-----------------
  const handleClickLike = async (values) => {
    try {
      const data = {
        song: values._id,
      };
      const action = like(data);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      //call api agin
      //favoriteSong
      const fetchFavoriteSongList = async () => {
        const getFavoriteSong = await favoriteSong.getAll();

        getFavoriteSong.favoriteSongList.map((x) => {
          const action = playAllFavoriteSong(x);
          dispatch(action);
        });
      };
      fetchFavoriteSongList();
    } catch (error) {
      console.log("loi", error);
    }
  };

  const handleClickDisLike = async (values) => {
    try {
      favoriteSong.disLike(values._id);
      const action = disLike(values._id);
      dispatch(action);
    } catch (error) {
      console.log("loi", error);
    }
  };

  return (
    <div>
      <div className='song-list-header'>
        <h3 className='zm-section-title'>Bài Hát</h3>
        <div className='section-button'>
          <input
            id='up-button'
            type='file'
            accept='audio/*'
            multiple
            style={{ display: "none" }}
          />
          <label className='btn-upload' htmlFor='up-button'>
            <a>
              <BackupIcon />
              Tải lên
            </a>
          </label>
          <Button onClick={handleClickPlayAll} variant='contained'>
            <PlayArrowIcon />
            PHÁT TẤT CẢ
          </Button>
        </div>
      </div>
      <div className='list-item'>
        {songList.map((songlist) => (
          <div
            key={songlist?.key}
            onClick={() => handleAddSong(songlist, songlist?.key)}
            className='media'
          >
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.img} alt='' />
              </div>

              <div className='card-info'>
                <p>{songlist?.name}</p>
                <span>{songlist?.singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <IconButton>
                <AddIcon />
              </IconButton>
              {songLiked.find((x) => x?.song?._id === songlist?._id) ? (
                <Tooltip title='Bỏ yêu thích' placement='top' arrow>
                  <IconButton onClick={() => handleClickDisLike(songlist)}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Yêu thích' placement='top' arrow>
                  <IconButton onClick={() => handleClickLike(songlist)}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSong;
