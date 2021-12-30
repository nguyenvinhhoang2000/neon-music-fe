import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { IconButton, Tooltip } from "@mui/material";
import { removeSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

Drawer.propTypes = {
  songId: PropTypes.any,
  songIndex: PropTypes.any,
};

function Drawer(props) {
  const { songId, songIndex } = props;

  const dispath = useDispatch();
  const songList = useSelector((state) => state.playingList);

  //func
  const hanldClickSong = (song) => {
    const index = songList.indexOf(song);
    songIndex(index);
  };

  const handleDeleteSong = (song) => {
    const songAtTheEnd = songList.length - 1 === songList.indexOf(song);
    const deleteSongPlaying = songId === song._id;
    if (songAtTheEnd) {
      songIndex(0);
      const action = removeSongList(song);
      dispath(action);
    } else {
      const action = removeSongList(song);
      dispath(action);
    }
  };

  return (
    <div className='drawer'>
      <div className='drawer-container'>
        <div className='drawer-container--title'>
          <h1>Danh sách phát</h1>
        </div>

        <div className='drawer-list'>
          {songList.map((songlist) => (
            <div
              key={songlist._id}
              className={songId === songlist._id ? "media is-playing" : "media"}
            >
              <div
                onClick={() => hanldClickSong(songlist)}
                className='media-item'
              >
                <MusicNoteIcon />
                <div className='song-thumb'>
                  <img src={songlist.img} alt='' />
                </div>

                <div className='card-info'>
                  <p>{songlist.name}</p>
                  <span>{songlist.singer}</span>
                </div>
              </div>
              <Tooltip title='xóa khõi danh sách' arrow>
                <IconButton onClick={() => handleDeleteSong(songlist)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
