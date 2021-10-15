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
import imgSrc1 from "../../assets/img/1.jpg";
import audio1 from "../../assets/music/ChacCoYeuLaDay.mp3";
import { useState } from "react";
import { useEffect } from "react";

PlayerController.propTypes = {};

//ListSong
const ListSong = [
  {
    name: "Chắc có yêu là đây",
    singer: "Sơn Tùn",
    img: imgSrc1,
    audioSrc: audio1,
  },
];

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function PlayerController(props) {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "light" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.7)"
      : "rgba(0,0,0,0.4)";
  //---------------------------------------------------
  const { name, singer, img, audioSrc } = ListSong[0];
  const audioRef = useRef(new Audio(audioSrc));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

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
                <IconButton aria-label='previous song'>
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
                    <PlayArrowRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  ) : (
                    <PauseRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  )}
                </IconButton>
                <IconButton aria-label='next song'>
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
                  max={duration}
                  onChange={(_, value) => setPosition(value)}
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
                <TinyText>-{formatDuration(duration - position)}</TinyText>
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
