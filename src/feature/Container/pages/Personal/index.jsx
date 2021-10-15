import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import ListSong from "components/ListSong";
import React from "react";
import "./style.scss";

Personal.propTypes = {};

function Personal(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='container'>
      <div className='container-user-profile'>
        <Avatar
          alt='Remy Sharp'
          src='https://s120-ava-talk.zadn.vn/5/c/5/5/2/120/045d9c0decb5452a962b2e0587d0142d.jpg'
          sx={{ width: 95, height: 95 }}
        />

        <h3 class='title'>Nguyễn Vĩnh Hoàng</h3>
      </div>
      <div className='library-song-list'>
        <ListSong></ListSong>
      </div>
    </div>
  );
}

export default Personal;
