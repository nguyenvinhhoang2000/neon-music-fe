import { createSlice } from "@reduxjs/toolkit";
import imgSrc1 from "assets/img/eight.jpg";
import audio1 from "assets/music/eight.mp3";

const playControlSlice = createSlice({
  name: "songlist",
  initialState: [
    {
      id: 1,
      name: "Eight",
      singer: "UI",
      img: imgSrc1,
      audioSrc: audio1,
    },
  ],
  reducers: {
    addSongList(state, action) {
      if (state.find((x) => x.id === action.payload.id)) {
      } else {
        state.push(action.payload);
      }
    },
    removeSongList(state, action) {
      if (state.length === 1) {
      } else {
        state.splice(
          state.indexOf(state.find((x) => x.id === action.payload.id)),
          1
        );
      }
    },
  },
});

const { actions, reducer } = playControlSlice;
export const { addSongList, removeSongList } = actions;
export default reducer;
