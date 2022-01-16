import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import favoriteSong from "api/favoriteSong";
import songApi from "api/songApi";
import ListSongPersonal from "components/ListSongPersonal";
import MyUpload from "components/MyUpload";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAllFavoriteSong } from "./favoriteSongSlice";
import "./style.scss";

Personal.propTypes = {};

function Personal(props) {
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [tab, setTab] = useState("1");

  //call api
  useEffect(() => {
    const fetchFavoriteSongList = async () => {
      const getFavoriteSong = await favoriteSong.getAll();

      getFavoriteSong.favoriteSongList.map((x) => {
        const action = playAllFavoriteSong(x);
        dispath(action);
      });
    };
    fetchFavoriteSongList();
  }, [user.name]);

  const favoriteSongList = useSelector((state) => state.favoriteSong);

  //----------func---------------
  const handleChangeTab = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <div className='container'>
      {!!user.name ? (
        <>
          <div className='container-user-profile'>
            <img src={user.avatar} alt='' />

            <h3 className='title'>{user.name}</h3>
          </div>
          <div className='library-song-list'>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  centered
                  onChange={handleChangeTab}
                  aria-label='lab API tabs example'
                  sx={{
                    color: "#fff",
                    "& .MuiTab-root": {
                      color: "#fff",
                      fontWeight: "400",
                    },
                    "& .Mui-selected": {
                      color: "#fff",
                      textShadow:
                        "0 0 7px #03bcf4, 0 0 10px #03bcf4, 0 0 21px #03bcf4, 0 0 42px #03bcf4, 0 0 82px #03bcf4",
                      "&:avtive": {
                        color: "#fff",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#fff",
                      boxShadow:
                        "0 0 7px #f09, 0 0 10px #f09, 0 0 21px #f09, 0 0 42px #f09, 0 0 82px #f09, 0 0 92px #f09",
                    },
                  }}
                >
                  <Tab label='Yêu Thích' value='1' />
                  <Tab label='Tải lên' value='2' />
                </TabList>
              </Box>

              <TabPanel value='1'>
                <ListSongPersonal
                  songList={favoriteSongList}
                ></ListSongPersonal>
              </TabPanel>
              <TabPanel value='2'>
                <MyUpload />
              </TabPanel>
            </TabContext>
          </div>
        </>
      ) : (
        <div>Bạn cần phải đăng nhập</div>
      )}
    </div>
  );
}

export default Personal;
