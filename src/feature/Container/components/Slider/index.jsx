import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import CardAlbum from "../CardAlbum";
import "./style.scss";

SliderAlbum.propTypes = {};

function SliderAlbum(props) {
  return (
    <div classNames='slider'>
      <div className='slider-container'>
        <h3 className='slider-container--title'>Có Thể Bạn Muốn Nghe</h3>

        <div className='slider-container--content'>
          <CardAlbum />
          <CardAlbum />
          <CardAlbum />
          <CardAlbum />
        </div>
      </div>
    </div>
  );
}

export default SliderAlbum;
