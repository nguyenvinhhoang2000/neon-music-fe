import { createSlice } from "@reduxjs/toolkit";

const allSongSlice = createSlice({
  name: "songs",
  initialState: [],
  reducers: {
    addAllSongg(state, action) {
      if (state.find((x) => x._id === action.payload._id)) {
      } else {
        state.push(action.payload);
      }
    },
  },
});

const { actions, reducer } = allSongSlice;
export const { addAllSongg } = actions;
export default reducer;
