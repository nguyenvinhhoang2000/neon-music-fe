import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackupIcon from "@mui/icons-material/Backup";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import favoriteSong from "api/favoriteSong";
import { disLike } from "feature/Container/pages/Personal/favoriteSongSlice";
import { addSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

ListSongPersonal.propTypes = {
  songList: PropTypes.array,
};

function ListSongPersonal(props) {
  const { songList } = props;

  const dispatch = useDispatch();

  const handleAddSong = (songlist, id) => {
    const action = addSongList(songlist);
    dispatch(action);
  };

  const handleClickPlayAll = () => {
    songList.map((x) => {
      const action = addSongList(x.song);
      dispatch(action);
    });
  };

  //---------------func-----------------
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
        <h3 className='zm-section-title'>Bài Hát Đã Thích</h3>
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
            key={songlist?.song?.key}
            onClick={() => handleAddSong(songlist?.song, songlist?.song?.key)}
            className='media'
          >
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.song?.img} alt='' />
              </div>

              <div className='card-info'>
                <p>{songlist?.song?.name}</p>
                <span>{songlist?.song?.singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <IconButton>
                <AddIcon />
              </IconButton>
              <Tooltip title='Bỏ yêu thích' placement='top' arrow>
                <IconButton onClick={() => handleClickDisLike(songlist?.song)}>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSongPersonal;
