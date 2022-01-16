import songApi from "api/songApi";
import React, { useEffect, useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./style.scss";
import AddIcon from "@mui/icons-material/Add";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function AccountManagenemt(props) {
  const [listSong, setListSong] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const getListSong = await songApi.getAll();

      setListSong(getListSong.songs);
    };
    callApi();
  }, []);
  return (
    <div className='account-manageget'>
      <div className='list-item'>
        {listSong.map((songlist) => (
          <div key={songlist?._id} className='media'>
            <div className='media-left'>
              <MusicNoteIcon />
              <div className='song-thumb'>
                <img src={songlist?.img_song} alt='' />
              </div>

              <div
                // onClick={() =>
                //   handleAddSong(songlist, songlist?._id)
                // }
                className='card-info'
              >
                <p>{songlist?.name_song}</p>
                <span>{songlist?.name_singer}</span>
              </div>
            </div>

            <div className='media-mid'>{}</div>

            <div className='media-right'>
              <Tooltip title='Thêm vào playlist' placement='top' arrow>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Bỏ yêu thích' placement='top' arrow>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountManagenemt;
