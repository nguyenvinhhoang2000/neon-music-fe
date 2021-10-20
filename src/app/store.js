import { configureStore } from "@reduxjs/toolkit";
import playControlSlice from "feature/PlayerControl/playControlSlice";

const rootReducer = {
  playingList: playControlSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
