import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
// import img from "assets/img/album/justatee.png";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

CardAlbum.propTypes = {};

function CardAlbum(props) {
  return (
    <div className='card'>
      <div className='card-item'>
        <div className='card-item--img'>
          <button>
            <i class='far fa-play-circle'></i>
          </button>
          <a href=''>{/* <img src={img} alt='' /> */}</a>
        </div>

        <div className='card-item--title'>
          <h1>Tuyển tập bài hát của Justatee</h1>
        </div>
      </div>
    </div>
  );
}

export default CardAlbum;
