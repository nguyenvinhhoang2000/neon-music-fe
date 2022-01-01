import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "./components/Drawer";
import "./style.scss";

PlayerController.propTypes = {};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function PlayerController(props) {
  const dispath = useDispatch();
  const songList = useSelector((state) => state.playingList);

  const [songIndex, setSongIndex] = useState(0);

  const { name_song, name_singer, img_song, url_song, _id } =
    songList[songIndex];

  //hooks
  const audioRef = useRef(new Audio(url_song));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const [positionVolume, setPositionVolum] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRanDom] = useState(false);

  //const
  const { duration } = audioRef.current;

  //func
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }

  const onScrub = (e, value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setPosition(audioRef.current.currentTime);
    startTimer();
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        if (isRandom) {
          randomIndex();
        } else {
          if (songList.length === 1) {
            setPosition(0);
            setIsPlaying(false);
          } else {
            toNextSong();
            setPosition(0);
          }
        }
      } else {
        setPosition(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const toPrevSong = () => {
    if (isRandom) {
      randomIndex();
    } else {
      if (songIndex - 1 < 0) {
        setSongIndex(songList.length - 1);
      } else {
        setSongIndex(songIndex - 1);
      }
    }
  };

  const toNextSong = () => {
    if (isRandom) {
      randomIndex();
    } else {
      if (songIndex < songList.length - 1) {
        setSongIndex(songIndex + 1);
        setPosition(0);
      } else {
        setSongIndex(0);
        setPosition(0);
      }
    }
  };

  //-------------volume----------
  const onScrubVollume = (e, value) => {
    audioRef.current.volume = value;
    setPositionVolum(audioRef.current.volume);
  };

  const handleVolumeClick = () => {
    if (audioRef.current.muted) {
      audioRef.current.muted = false;
      setPositionVolum(audioRef.current.volume);
    } else {
      audioRef.current.muted = true;
      setPositionVolum(0);
    }
  };

  //----------------repeat--------------
  const handleRepeatClick = () => {
    if (isRepeat) {
      audioRef.current.loop = false;
      setIsRepeat(audioRef.current.loop);
    } else {
      audioRef.current.loop = true;
      setIsRepeat(audioRef.current.loop);
    }
  };

  //------------------random-------------
  const handleRandomClick = () => {
    if (isRandom) {
      setIsRanDom(false);
    } else {
      setIsRanDom(true);
    }
  };

  const randomIndex = () => {
    const random = Math.floor(Math.random() * songList.length);
    setSongIndex(random);
  };

  //---------------------------------------------------

  //----------SongListPlaying--------
  const [isOpen, setIsOpen] = useState(false);

  const handleSongListClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  //------------handlClickChangeSong---------------
  const hanldSongClick = (index) => {
    setSongIndex(index);
  };

  //handle play audio
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(url_song);
    setPosition(0);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [songList[songIndex]._id]);

  return (
    <div className='now-playing-bar'>
      <div className='player-controls'>
        <div className='level player-controls__container'>
          <div className='player-controls-left '>
            <figure className='image'>
              <img src={img_song} alt={name_song} />
            </figure>
            <div className='content'>
              <p className='name-song'>{name_song}</p>
              <span className='name-singer'>{name_singer}</span>
            </div>
          </div>

          <div className='player-controls__player-bar'>
            <div className='level-item'>
              <div className='actions'>
                <Tooltip title='Phát ngẫu nhiên' arrow>
                  <IconButton
                    onClick={handleRandomClick}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(255 255 255 / 16%)",
                      },
                    }}
                  >
                    <ShuffleIcon
                      style={
                        isRandom ? { color: "#7200A1" } : { color: "#fff" }
                      }
                      fontSize='medium'
                    />
                  </IconButton>
                </Tooltip>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(255 255 255 / 16%)",
                    },
                  }}
                  onClick={toPrevSong}
                  aria-label='previous song'
                >
                  <FastRewindIcon fontSize='large' style={{ color: "#fff" }} />
                </IconButton>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(255 255 255 / 16%)",
                    },
                  }}
                  aria-label={isPlaying ? "play" : "pause"}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseIcon style={{ color: "#fff", fontSize: "2.5rem" }} />
                  ) : (
                    <PlayArrowIcon
                      style={{ color: "#fff", fontSize: "2.5rem" }}
                    />
                  )}
                </IconButton>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(255 255 255 / 16%)",
                    },
                  }}
                  onClick={toNextSong}
                  aria-label='next song'
                >
                  <FastForwardIcon fontSize='large' style={{ color: "#fff" }} />
                </IconButton>
                <Tooltip title='Lặp lại' arrow>
                  <IconButton
                    onClick={handleRepeatClick}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgb(255 255 255 / 16%)",
                      },
                    }}
                  >
                    <RepeatIcon
                      style={
                        isRepeat ? { color: "#7200A1" } : { color: "#fff" }
                      }
                      fontSize='medium'
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className='level-item'>
              <span className='time left'>
                <TinyText>{formatDuration(position)}</TinyText>
              </span>

              <div className='zm-duration-bar'>
                <Slider
                  size='small'
                  value={position}
                  min={0}
                  step={1}
                  max={duration ? duration : 0}
                  onChange={onScrub}
                  sx={{
                    color: "#fff",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,
                      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                      "&:before": {
                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)
                        `,
                      },
                      "&.Mui-active": {
                        width: 20,
                        height: 20,
                      },
                    },
                    "& .MuiSlider-rail": {
                      opacity: 0.28,
                    },
                  }}
                />
              </div>

              <span className='time right'>
                <TinyText>
                  {duration ? formatDuration(duration) : "0:00"}
                </TinyText>
              </span>
            </div>
          </div>

          <div className='player-controls-right'>
            <IconButton
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(255 255 255 / 16%)",
                },
              }}
              fontSize='medium'
              style={{ color: "#fff" }}
              onClick={handleVolumeClick}
            >
              {audioRef.current.volume === 0 ||
              audioRef.current.muted === true ? (
                <VolumeOffIcon style={{ color: "#fff" }} />
              ) : (
                <VolumeUpIcon style={{ color: "#fff" }} />
              )}
            </IconButton>
            <Slider
              aria-label='Volume'
              value={positionVolume}
              min={0}
              step={0.1}
              max={1}
              onChange={onScrubVollume}
              sx={{
                width: 120,
                color: "#fff",
                height: 4,
                "& .MuiSlider-track": {
                  height: 2,
                },
                "& .MuiSlider-thumb": {
                  width: 8,
                  height: 8,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)
                    `,
                  },
                  "&.Mui-active": {
                    width: 15,
                    height: 15,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
              }}
            />

            <Tooltip title='Danh sách phát' arrow>
              <IconButton
                sx={{
                  "&:hover": {
                    backgroundColor: "rgb(255 255 255 / 16%)",
                  },
                }}
                onClick={handleSongListClick}
              >
                <QueueMusicIcon
                  style={isOpen ? { color: "#7200A1" } : { color: "#fff" }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={isOpen ? "drawer-bar is-show" : "drawer-bar"}>
        <Drawer songId={_id} songIndex={hanldSongClick} />
      </div>
    </div>
  );
}

export default PlayerController;
