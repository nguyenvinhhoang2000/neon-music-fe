import React from "react";
import "./style.scss";
import ZM_Button from "../../../../components/Button";
import PlayerControlMui from "feature/PlayerControlMui";

Discover.propTypes = {};

function Discover(props) {
  return (
    <div className='container'>
      <PlayerControlMui />
    </div>
  );
}

export default Discover;
