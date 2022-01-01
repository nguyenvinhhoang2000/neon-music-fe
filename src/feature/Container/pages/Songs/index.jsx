import favoriteSong from "api/favoriteSong";
import songList from "api/songApi";
import ListSong from "components/ListSong";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAllFavoriteSong } from "../Personal/favoriteSongSlice";
import { addAllSongg } from "./allSongSlice";
import "./style.scss";

Songs.propTypes = {};

function Songs(props) {
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.current);
  //call api
  useEffect(() => {
    //allSong
    const fetchSongList = async () => {
      const getSongs = await songList.getAll();

      getSongs?.songs.map((x) => {
        const action = addAllSongg(x);
        dispath(action);
      });
    };
    fetchSongList();
    //favoriteSong
    const fetchFavoriteSongList = async () => {
      const getFavoriteSong = await favoriteSong.getAll();

      getFavoriteSong.favoriteSongList.map((x) => {
        const action = playAllFavoriteSong(x);
        dispath(action);
      });
    };
    fetchFavoriteSongList();
  }, [user.name]);

  //--------const---------------
  const allSong = useSelector((state) => state.songs);

  return (
    <div className='container'>
      <div className='library-song-list'>
        <ListSong songList={allSong}></ListSong>
      </div>
    </div>
  );
}

export default Songs;
