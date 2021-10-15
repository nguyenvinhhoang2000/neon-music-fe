import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListSongs from "../../assets/listsong";

ListSong.propTypes = {};

function ListSong(props) {
  return (
    <div>
      <div className='list-item'>
        {ListSongs.map((listsong) => (
          <div className='media'>
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={listsong.img} alt='' />
              </div>

              <div className='card-info'>
                <p>{listsong.name}</p>
                <span>{listsong.singer}</span>
              </div>
            </div>

            <div className='media-right'>
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
