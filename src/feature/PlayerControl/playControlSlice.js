import { createSlice } from "@reduxjs/toolkit";
import imgSrc1 from "../../assets/img/1.jpg";
import audio1 from "../../assets/music/ChacCoYeuLaDay.mp3";

const playControlSlice = createSlice({
  name: "songlist",
  initialState: [
    {
      id: 1,
      name: "Chắc có yêu là đây",
      singer: "Sơn Tùn",
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
      state.splice(action.payload.id - 1, 1);
    },
  },
});

const { actions, reducer } = playControlSlice;
export const { addSongList, removeSongList } = actions;
export default reducer;
