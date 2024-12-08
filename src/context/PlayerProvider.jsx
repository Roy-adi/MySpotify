/* eslint-disable no-unused-vars */
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types

export const PlayerProvider = ({ children }) => {
 
  
  const [playlist, setPlaylist] = useState([]); // Store the current playlist
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current song index
  const [playStatus, setPlayStatus] = useState(false); // Play/Pause status
  const audioRef = useRef(null);

  // Function to set the playlist and play the selected song
  const updateTrack = (song, songs) => {
    const index = songs.findIndex((s) => s._id === song._id); // Find the index of the current song
    setPlaylist(songs); // Set the entire playlist
    setCurrentIndex(index); // Set the index of the selected song
    playSong(song); // Play the selected song
  };

  const playSong = (song) => {
    setPlayStatus(true);
    if (audioRef.current) {
      audioRef.current.src = song.audio;
      audioRef.current.play();
    }
  };

  const play = () => {
    setPlayStatus(true);
    audioRef.current?.play();
  };

  const pause = () => {
    setPlayStatus(false);
    audioRef.current?.pause();
  };

  const next = () => {
    if (currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      playSong(playlist[nextIndex]);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      playSong(playlist[prevIndex]);
    }
  };



  const values = {
    track: playlist[currentIndex] || null, // Current song data
    playlist,
    playStatus,
    play,
    pause,
    next,
    previous,
    updateTrack,
    audioRef,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const usePlayerContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
