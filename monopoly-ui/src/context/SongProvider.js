import React, { useEffect, useState } from "react";
import SongContext from "./SongContext";

const SongProvider = ({ children }) => {
  const [song, setSong] = useState({
    audio: "",
    isPlaying: false,
  });

  useEffect(() => {
      const songPath = require(`../assets/songs/monopoly.mp3`);
      setSong({
        audio: new Audio(songPath),
        isPlaying: false,
      });
  }, []);

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
