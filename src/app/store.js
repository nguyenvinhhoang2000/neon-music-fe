import { configureStore } from "@reduxjs/toolkit";
import songListReducer from "components/ListSong/listSongSlice";

const rootReducer = {
  songList: songListReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
