import { configureStore } from "@reduxjs/toolkit";
import playControlSlice from "feature/PlayerControl/playControlSlice";
import userReducer from "feature/auth/userSlice";
import songReducer from "feature/Container/pages/Songs/allSongSlice";
import favoritesongReducer from "feature/Container/pages/Personal/favoriteSongSlice";

const rootReducer = {
  playingList: playControlSlice,
  user: userReducer,
  songs: songReducer,
  favoriteSong: favoritesongReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
