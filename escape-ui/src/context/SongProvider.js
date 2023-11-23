import React, { useEffect, useState } from "react";
import SongContext from "./SongContext";

const SongProvider = ({ children }) => {
  const roomNumber = localStorage.getItem("roomNumber");
  const [song, setSong] = useState({
    audio: "",
    isPlaying: false,
  });
  const [alert, setAlert] = useState({
    audio: "",
    isPlaying: false,
  });

  useEffect(() => {
    if (roomNumber) {
      const songPath = require(`../assets/songs/room${roomNumber}.mp3`);
      const alertPath = require(`../assets/songs/alert${roomNumber}.mp3`);
      setSong({
        audio: new Audio(songPath),
        isPlaying: false,
      });
      setAlert({
        audio: new Audio(alertPath),
        isPlaying: false,
      });
    }
  }, [roomNumber]);

  const playSong = () => {
    if (song.isPlaying) return;
    setSong((prev) => ({ ...prev, isPlaying: true }));
    song.audio.play();
    song.audio.loop = true;
  };

  const playAlert = () => {
    if (alert.isPlaying) return;
    setAlert((prev) => ({ ...prev, isPlaying: true }));
    alert.audio.play();
    alert.audio.volume= 0.8;
    alert.audio.loop = true;
  };

  const stopSong = () => {
    if (!song.isPlaying) return;
    setSong((prev) => ({ ...prev, isPlaying: false }));
    song.audio.pause();
    song.audio.currentTime = 0;
  };

  const stopAlert = () => {
    if (!alert.isPlaying) return;
    setAlert((prev) => ({ ...prev, isPlaying: false }));
    alert.audio.pause();
    alert.audio.currentTime = 0;
  };

  const decreaseSongVolume = () => {
    if (!song.isPlaying) return;
    song.audio.volume=0.5;
  };
  
  const increaseSongVolume = () => {
    if (!song.isPlaying) return;
    song.audio.volume=1;
  };

  return (
    <SongContext.Provider
      value={{
        playSong,
        stopSong,
        decreaseSongVolume,
        increaseSongVolume,
        playAlert,
        stopAlert,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
