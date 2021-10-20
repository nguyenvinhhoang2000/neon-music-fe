import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/system";
import { removeSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

Drawer.propTypes = {
  songId: PropTypes.any,
};

function Drawer(props) {
  const { songId } = props;

  const dispath = useDispatch();
  const songList = useSelector((state) => state.playingList);

  //func
  const handleDeleteSong = (song, id) => {
    const action = removeSongList(song);
    dispath(action);
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
              key={songlist.id}
              className={songId === songlist.id ? "media is-playing" : "media"}
              onClick={() => handleDeleteSong(songlist, songlist.id)}
            >
              <div className='media-item'>
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
                <IconButton>
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
