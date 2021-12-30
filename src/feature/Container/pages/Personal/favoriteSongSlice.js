import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favoriteSong from "api/favoriteSong";

export const like = createAsyncThunk("favoriteSong/like", async (payload) => {
  //call API to like
  const data = await favoriteSong.like(payload);

  return data.getFavoriteSong.song;
});

const favoriteSongSlice = createSlice({
  name: "FavoriteSong",
  initialState: [],
  reducers: {
    playAllFavoriteSong(state, action) {
      if (state.find((x) => x._id === action.payload._id)) {
      } else {
        state.push(action.payload);
      }
    },
    disLike(state, action) {
      state.splice(
        state.indexOf(state.find((x) => x.song._id === action.payload)),
        1
      );
    },
    likeSong(state, action) {
      if (state.find((x) => x._id === action.payload._id)) {
      } else {
        state.push(action.payload);
      }
    },
    resetFavoriteSong(state) {
      state.splice(0, state.length);
    },
  },
  extraReducers: {
    [like.fulfilled]: (state, action) => {
      state = action.payload;
    },
  },
});

const { actions, reducer } = favoriteSongSlice;
export const { playAllFavoriteSong, disLike, likeSong, resetFavoriteSong } =
  actions;
export default reducer;
