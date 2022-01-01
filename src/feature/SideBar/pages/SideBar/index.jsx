import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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
import { NavLink } from "react-router-dom";
import "./style.scss";

import { useSelector } from "react-redux";

SideBar.propTypes = {};

function SideBar(props) {
  const showPlayerControl = useSelector((state) => state.playingList);

  return (
    <div
      style={
        showPlayerControl.length > 0
          ? { height: "calc(100vh - 90px)" }
          : { height: "100vh" }
      }
      className='zm-sidebar'
    >
      <div className='zm-sidebar--logo'>
        <h1 className='logo-neon'>neon</h1>
        <span className='logo-music'>music</span>
      </div>

      <div className='zm-sidebar--main'>
        <ul>
          <li className='active'>
            <NavLink to='/personal'>
              <LibraryMusicOutlinedIcon />
              Cá Nhân
            </NavLink>
          </li>
          <li>
            <NavLink to='/discover'>
              <AlbumOutlinedIcon />
              Khám Phá
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/'>
              <TimelineOutlinedIcon />
              Tất cả bài hát
            </NavLink>
          </li>
          <li>
            <NavLink to='/1'>
              <RadioOutlinedIcon />
              Radio
              <figure className='img'>
                <img
                  src='https://zjs.zadn.vn/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg'
                  alt=''
                />
              </figure>
            </NavLink>
          </li>
          <li>
            <NavLink to='/2'>
              <FavoriteBorderOutlinedIcon />
              Theo Dõi
            </NavLink>
          </li>
        </ul>
      </div>

      <div className='zm-sidebar--divide'></div>

      <div className='zm-sidebar--scroll'>
        <div className='zm-sidebar--scrolbar'>
          {/* <ul>
            <li>
              <NavLink to='/#'>
                <MusicNoteOutlinedIcon />
                Nhạc Mới
              </NavLink>
            </li>
            <li>
              <NavLink to='/#'>
                <CategoryOutlinedIcon />
                Thể Loại
              </NavLink>
            </li>
            <li>
              <NavLink to='/#'>
                <StarBorderOutlinedIcon />
                Top 100
              </NavLink>
            </li>
            <li>
              <NavLink to='/#'>
                <LiveTvOutlinedIcon />
                MV
              </NavLink>
            </li>
          </ul> */}

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
        <AddOutlinedIcon />
        Tạo playlist mới
      </div>
    </div>
  );
}

export default SideBar;
