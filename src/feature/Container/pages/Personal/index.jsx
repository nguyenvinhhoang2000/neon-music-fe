import Avatar from "@mui/material/Avatar";
import favoriteSong from "api/favoriteSong";
import ListSongPersonal from "components/ListSongPersonal";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAllFavoriteSong, resetFavoriteSong } from "./favoriteSongSlice";
import "./style.scss";

Personal.propTypes = {};

function Personal(props) {
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.current);

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

  return (
    <div className='container'>
      {!!user.name ? (
        <>
          <div className='container-user-profile'>
            <img src={user.avatar} alt='' />

            <h3 class='title'>{user.name}</h3>
          </div>
          <div className='library-song-list'>
            <ListSongPersonal songList={favoriteSongList}></ListSongPersonal>
          </div>
        </>
      ) : (
        <div>Bạn cần phải đăng nhập</div>
      )}
    </div>
  );
}

export default Personal;
