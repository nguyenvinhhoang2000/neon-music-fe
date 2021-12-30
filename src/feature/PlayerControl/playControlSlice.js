import { createSlice } from "@reduxjs/toolkit";
import imgSrc1 from "assets/img/eight.jpg";
import audio1 from "assets/music/eight.mp3";

const playControlSlice = createSlice({
  name: "songlist",
  initialState: [],
  reducers: {
    addSongList(state, action) {
      if (state.find((x) => x._id === action.payload._id)) {
      } else {
        state.push(action.payload);
      }
    },
    removeSongList(state, action) {
      if (state.length === 1) {
      } else {
        state.splice(
          state.indexOf(state.find((x) => x._id === action.payload._id)),
          1
        );
      }
    },
  },
});

const { actions, reducer } = playControlSlice;
export const { addSongList, removeSongList } = actions;
export default reducer;
