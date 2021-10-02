import AddIcon from "@mui/icons-material/Add";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import RadioOutlinedIcon from "@mui/icons-material/RadioOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import React from "react";
import "./style.scss";

SideBar.propTypes = {};

function SideBar(props) {
  return (
    <div className='zm-sidebar'>
      <div className='zm-sidebar--logo'>
        <button className='zm-btn button' tabIndex='0'>
          <div className='zmp3-logo'></div>
        </button>
      </div>

      <div className='zm-sidebar--main'>
        <ul>
          <li className='active'>
            <LibraryMusicOutlinedIcon />
            <span>Cá Nhân </span>
          </li>
          <li>
            <AlbumOutlinedIcon />
            <span>Khám Phá</span>
          </li>
          <li>
            <TimelineOutlinedIcon />
            <span>#zingchart</span>
          </li>
          <li>
            <RadioOutlinedIcon />
            <span>Radio</span>
            <figure className='img'>
              <img
                src='https://zjs.zadn.vn/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg'
                alt=''
              />
            </figure>
          </li>
          <li>
            <FavoriteBorderOutlinedIcon />
            <span>Theo Dõi</span>
          </li>
        </ul>
      </div>

      <div className='zm-sidebar--divide'></div>

      <div className='zm-sidebar--scroll'>
        <div className='zm-sidebar--scrolbar'>
          <ul>
            <li>
              <MusicNoteOutlinedIcon />
              Nhạc Mới
            </li>
            <li>
              <CategoryOutlinedIcon />
              Thể Loại
            </li>
            <li>
              <StarBorderOutlinedIcon />
              Top 100
            </li>
            <li>
              <LiveTvOutlinedIcon />
              MV
            </li>
          </ul>

          <div className='vip-banner'>
            <div className='text'>
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <a className='zm-btn' href='#'>
              MUA VIP
            </a>
          </div>
        </div>
      </div>
      <div className='zm-sidebar--addplaylist'>
        <AddIcon />
        Tạo playlist mới
      </div>
    </div>
  );
}

export default SideBar;
