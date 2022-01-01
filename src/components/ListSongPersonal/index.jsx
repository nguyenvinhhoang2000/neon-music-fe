import AddIcon from "@mui/icons-material/Add";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import favoriteSong from "api/favoriteSong";
import UploadForm from "components/form-upload";
import { disLike } from "feature/Container/pages/Personal/favoriteSongSlice";
import { addSongList } from "feature/PlayerControl/playControlSlice";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

ListSongPersonal.propTypes = {
  songList: PropTypes.array,
};

function ListSongPersonal(props) {
  const { songList } = props;

  const dispatch = useDispatch();

  const handleAddSong = (songlist, id) => {
    const action = addSongList(songlist);
    dispatch(action);
  };

  const handleClickPlayAll = () => {
    songList.map((x) => {
      const action = addSongList(x.song);
      dispatch(action);
    });
  };

  //---------------func-----------------
  const handleClickDisLike = async (values) => {
    try {
      await favoriteSong.disLike(values._id);
      const action = disLike(values._id);
      dispatch(action);
    } catch (error) {
      console.log("loi", error);
    }
  };

  //---------upload-song------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='song-list-header'>
        <h3 className='zm-section-title'>Bài Hát Đã Thích</h3>
        <div className='section-button'>
          <button className='btn-upload' onClick={handleClickOpen}>
            <BackupIcon />
            Tải lên
          </button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
          >
            <IconButton
              sx={{
                width: 40,
                margin: "0 0 0 auto",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent
              sx={{
                padding: "0 24px 8px 24px",
              }}
            >
              <UploadForm />
            </DialogContent>
          </Dialog>

          <Button onClick={handleClickPlayAll} variant='contained'>
            <PlayArrowIcon />
            PHÁT TẤT CẢ
          </Button>
        </div>
      </div>
      <div className='list-item'>
        {songList.map((songlist) => (
          <div key={songlist?.song?._id} className='media'>
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.song?.img_song} alt='' />
              </div>

              <div
                onClick={() =>
                  handleAddSong(songlist?.song, songlist?.song?._id)
                }
                className='card-info'
              >
                <p>{songlist?.song?.name_song}</p>
                <span>{songlist?.song?.name_singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <Tooltip title='Thêm vào playlist' placement='top' arrow>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Bỏ yêu thích' placement='top' arrow>
                <IconButton onClick={() => handleClickDisLike(songlist?.song)}>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListSongPersonal;
