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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import songApi from "api/songApi";
import { useSnackbar } from "notistack";
import EditForm from "components/form-upload/form-edit";
// import "./style.scss";

MyUpload.propTypes = {
  songList: PropTypes.array,
};

function MyUpload(props) {
  const { songList } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [listMyUpload, setListMyUpload] = useState([]);

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

  useEffect(() => {
    //myupload
    const fetchMyUpload = async () => {
      const getMyUpload = await songApi.getMyUpload();

      setListMyUpload(getMyUpload.songs);
    };
    fetchMyUpload();
  }, []);

  //---------upload-song------------
  const [openFormUploadSong, setOpenFormUploadSong] = useState(false);

  const handleClickOpenFormUpload = () => {
    setOpenFormUploadSong(true);
  };

  const handleCloseFormUpload = () => {
    setOpenFormUploadSong(false);
  };
  //----------edit-song-------------
  const [openFormEditSong, setOpenFormEditSong] = useState(false);
  const [valuesEdit, setValuesEdit] = useState(null);
  const handleClickOpenFormEdit = (values) => {
    setOpenFormEditSong(true);
    setValuesEdit(values);
  };

  const handleCloseFormEdit = () => {
    setOpenFormEditSong(false);
  };

  //-----------delete-song-----------
  const handleClickDelete = async (id) => {
    try {
      await songApi.remove(id);
      enqueueSnackbar("Xóa thành công!!!", { variant: "success" });

      //call lại api
      const getMyUpload = await songApi.getMyUpload();

      setListMyUpload(getMyUpload.songs);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <div className='song-list-header'>
        <h3 className='zm-section-title'>Bài Hát Đã Tải lên</h3>
        <div className='section-button'>
          <button className='btn-upload' onClick={handleClickOpenFormUpload}>
            <BackupIcon />
            Tải lên
          </button>

          <Dialog
            open={openFormUploadSong}
            onClose={handleCloseFormUpload}
            aria-labelledby='form-dialog-title'
          >
            <IconButton
              sx={{
                width: 40,
                margin: "0 0 0 auto",
              }}
              onClick={handleCloseFormUpload}
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
        {listMyUpload?.map((songlist) => (
          <div key={songlist?._id} className='media'>
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.img_song} alt='' />
              </div>

              <div
                onClick={() => handleAddSong(songlist, songlist?._id)}
                className='card-info'
              >
                <p>{songlist?.name_song}</p>
                <span>{songlist?.name_singer}</span>
              </div>
            </div>

            <div className='media-right'>
              <Tooltip title='Thêm vào playlist' placement='top' arrow>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Sửa bài hát' placement='top' arrow>
                <IconButton onClick={() => handleClickOpenFormEdit(songlist)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Xóa bài hát' placement='top' arrow>
                <IconButton onClick={() => handleClickDelete(songlist._id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
        <Dialog
          open={openFormEditSong}
          onClose={handleCloseFormEdit}
          aria-labelledby='form-dialog-title'
        >
          <IconButton
            sx={{
              width: 40,
              margin: "0 0 0 auto",
            }}
            onClick={handleCloseFormEdit}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent
            sx={{
              padding: "0 24px 8px 24px",
            }}
          >
            <EditForm edit={valuesEdit} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default MyUpload;
