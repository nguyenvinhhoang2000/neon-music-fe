import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

ListSong.propTypes = {};

function ListSong(props) {
  return (
    <div>
      <div className='list-item'>
        <div className='media'>
          <div className='media-left'>
            <MusicNoteIcon />
            <div className='song-thumb'>
              <img
                src='https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/e/0/e0a93e9df0a781ff081d1414bdffc919_1486435376.jpg'
                alt=''
              />
            </div>

            <div className='card-info'>
              <p>Khóc Một Mình</p>
              <span>Krik</span>
            </div>
          </div>

          <div className='media-right'>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSong;
