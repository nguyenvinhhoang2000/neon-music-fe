import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { addSongList } from "feature/PlayerControl/playControlSlice";
import React from "react";
import { useDispatch } from "react-redux";
import ListSongs from "../../assets/listsong";
import "./style.scss";

ListSong.propTypes = {};

function ListSong(props) {
  const dispath = useDispatch();
  const handleAddSong = (songlist, id) => {
    const action = addSongList(songlist);
    dispath(action);
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
              <FileUploadOutlinedIcon />
              Tải lên
            </a>
          </label>
          <Button variant='contained'>
            <PlayArrowIcon />
            PHÁT TẤT CẢ
          </Button>
        </div>
      </div>
      <div className='list-item'>
        {ListSongs.map((songlist) => (
          <div
            key={songlist.id}
            onClick={() => handleAddSong(songlist, songlist.id)}
            className='media'
          >
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist.img} alt='' />
              </div>

              <div className='card-info'>
                <p>{songlist.name}</p>
                <span>{songlist.singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSong;
