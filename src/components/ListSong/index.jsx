import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { unwrapResult } from "@reduxjs/toolkit";
import favoriteSong from "api/favoriteSong";
import {
  disLike,
  like,
  playAllFavoriteSong,
} from "feature/Container/pages/Personal/favoriteSongSlice";
import { addSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

ListSong.propTypes = {
  songList: PropTypes.array,
};

function ListSong(props) {
  const { songList } = props;

  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = {
        song: values._id,
      };

      const action = await like(data);
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
      setLoading(false);
    } catch (error) {
      console.log("loi", error);
    }
  };

  const handleClickDisLike = async (values) => {
    try {
      await favoriteSong.disLike(values._id);
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
          <Button onClick={handleClickPlayAll} variant='contained'>
            <PlayArrowIcon />
            PHÁT TẤT CẢ
          </Button>
        </div>
      </div>
      <div className='list-item'>
        {songList.map((songlist) => (
          <div key={songlist?._id} className='media'>
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.img_song} alt='' />
              </div>

              <div
                onClick={() => handleAddSong(songlist, songlist?._id)}
                className='card-info'
              >
                <p>{songlist?.name_song}</p>
                <span>{songlist?.name_singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <Tooltip title='Thêm vào playlist' placement='top' arrow>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              {songLiked.find((x) => x?.song?._id === songlist?._id) ? (
                <Tooltip title='Bỏ yêu thích' placement='top' arrow>
                  <IconButton
                    disabled={loading}
                    onClick={() => handleClickDisLike(songlist)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Yêu thích' placement='top' arrow>
                  <IconButton
                    disabled={loading}
                    onClick={() => handleClickLike(songlist)}
                  >
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
