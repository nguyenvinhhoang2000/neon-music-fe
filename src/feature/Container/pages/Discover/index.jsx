import React from "react";
import "./style.scss";
import ZM_Button from "../../../../components/Button";
import PlayerControlMui from "feature/PlayerControlMui";
import SliderAlbum from "feature/Container/components/Slider";

Discover.propTypes = {};

function Discover(props) {
  return (
    <div className='container'>
      <SliderAlbum />
    </div>
  );
}

export default Discover;
