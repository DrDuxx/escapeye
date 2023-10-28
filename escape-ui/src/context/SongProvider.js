import React, { useEffect, useState } from "react";
import SongContext from "./SongContext";

const SongProvider = ({ children }) => {
  const roomNumber = localStorage.getItem("roomNumber");
  const [song, setSong] = useState({
    audio: "",
    isPlaying: false,
  });

  useEffect(() => {
    if (roomNumber) {
      const songPath = require(`../assets/songs/room${roomNumber}.mp3`);
      setSong({
        audio: new Audio(songPath),
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

  const stopSong = () => {
    if (!song.isPlaying) return;
    setSong((prev) => ({ ...prev, isPlaying: false }));
    song.audio.pause();
    song.audio.currentTime = 0;
  };

  return (
    <SongContext.Provider value={{ playSong, stopSong }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongProvider;
