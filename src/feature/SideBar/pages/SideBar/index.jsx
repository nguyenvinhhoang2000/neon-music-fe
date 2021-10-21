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
import { NavLink } from "react-router-dom";
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
            <NavLink exact to='/'>
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
            <NavLink to='/1'>
              <TimelineOutlinedIcon />
              #zingchart
            </NavLink>
          </li>
          <li>
            <NavLink to='/3'>
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
          <ul>
            <li>
              <NavLink to='/4'>
                <MusicNoteOutlinedIcon />
                Nhạc Mới
              </NavLink>
            </li>
            <li>
              <NavLink to='/5'>
                <CategoryOutlinedIcon />
                Thể Loại
              </NavLink>
            </li>
            <li>
              <NavLink to='/6'>
                <StarBorderOutlinedIcon />
                Top 100
              </NavLink>
            </li>
            <li>
              <NavLink to='/7'>
                <LiveTvOutlinedIcon />
                MV
              </NavLink>
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
