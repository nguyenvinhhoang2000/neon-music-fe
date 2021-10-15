import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./style.scss";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ListSong from "../../assets/listsong";

PlayerController.propTypes = {};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function PlayerController(props) {
  const [songIndex, setSongIndex] = useState(0);
  const { name, singer, img, audioSrc } = ListSong[songIndex];

  //hooks
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //const
  const { duration } = audioRef.current;

  //func
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }

  const onScrub = (value) => {
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
        toNextSong();
        setPosition(0);
      } else {
        setPosition(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const toPrevSong = () => {
    if (songIndex - 1 < 0) {
      setSongIndex(ListSong.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  const toNextSong = () => {
    if (songIndex < ListSong.length - 1) {
      setSongIndex(songIndex + 1);
      setPosition(0);
    } else {
      setSongIndex(0);
      setPosition(0);
    }
  };

  const mainIconColor = theme.palette.mode === "light" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.7)"
      : "rgba(0,0,0,0.4)";
  //---------------------------------------------------

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

    audioRef.current = new Audio(audioSrc);
    setPosition(0);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [songIndex]);

  return (
    <div className='now-playing-bar'>
      <div className='player-controls'>
        <div className='level player-controls__container'>
          <div className='player-controls-left '>
            <figure className='image'>
              <img src={img} alt={name} />
            </figure>
            <div className='content'>
              <p className='name-song'>{name}</p>
              <span className='name-singer'>{singer}</span>
            </div>
          </div>

          <div className='player-controls__player-bar'>
            <div className='level-item'>
              <div className='actions'>
                <IconButton onClick={toPrevSong} aria-label='previous song'>
                  <FastRewindRounded
                    fontSize='large'
                    htmlColor={mainIconColor}
                  />
                </IconButton>
                <IconButton
                  aria-label={isPlaying ? "play" : "pause"}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  ) : (
                    <PlayArrowRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  )}
                </IconButton>
                <IconButton onClick={toNextSong} aria-label='next song'>
                  <FastForwardRounded
                    fontSize='large'
                    htmlColor={mainIconColor}
                  />
                </IconButton>
              </div>
            </div>

            <div className='level-item'>
              <span className='time left'>
                <TinyText>{formatDuration(position)}</TinyText>
              </span>

              <div className='zm-duration-bar'>
                <Slider
                  aria-label='time-indicator'
                  size='small'
                  value={position}
                  min={0}
                  step={1}
                  max={duration ? duration : `${duration}`}
                  onChange={(e) => onScrub(e.target.value)}
                  sx={{
                    color:
                      theme.palette.mode === "light"
                        ? "#fff"
                        : "rgba(0,0,0,0.87)",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,
                      transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                      "&:before": {
                        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px ${
                          theme.palette.mode === "dark"
                            ? "rgb(255 255 255 / 16%)"
                            : "rgb(0 0 0 / 16%)"
                        }`,
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
            <Stack spacing={1} direction='row' alignItems='center'>
              <VolumeUpRounded htmlColor={lightIconColor} />
              <Slider
                aria-label='Volume'
                defaultValue={30}
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "#fff"
                      : "rgba(0,0,0,0.87)",
                  height: 2.5,
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                    backgroundColor: "#fff",
                    "&:before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerController;
