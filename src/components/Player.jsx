import { usePlayerContext } from "../context/PlayerProvider";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import spotify_logo from "../assets/spotify_logo.png";
import { useEffect, useState } from "react";

const Player = () => {
  const { track, playStatus, play, pause, next, previous, audioRef } = usePlayerContext();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const [isMuted, setIsMuted] = useState(false); // Mute state

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      audioRef.current.volume = volume; // Set initial volume
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, [audioRef, volume]);

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const updateDuration = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const time = Number(event.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Adjust the audio element volume
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume; // Restore volume
    } else {
      audioRef.current.volume = 0; // Mute
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-6 py-3 shadow-lg z-50">
      {/* Current Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          className="w-16 h-16 object-cover rounded-md"
          src={track?.image || spotify_logo}
          alt="Track"
        />
        <div>
          <p className="text-lg font-semibold truncate">
            {track?.songName || "No Track"}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {track?.description?.slice(0, 50) || "Select a track to start playing"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 w-full lg:w-1/2 z-50">
        <div className="flex items-center gap-6">
          <FaStepBackward
            onClick={previous}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-all"
          />
          {playStatus ? (
            <FaPause
              onClick={pause}
              className="text-3xl text-white hover:text-gray-400 cursor-pointer transition-all"
            />
          ) : (
            <FaPlay
              onClick={play}
              className="text-3xl text-white hover:text-gray-400 cursor-pointer transition-all"
            />
          )}
          <FaStepForward
            onClick={next}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-all"
          />
        </div>
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full z-50">
          <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="w-full accent-green-500 bg-gray-700 rounded-full appearance-none h-1 cursor-pointer"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #1DB954 ${(
                (currentTime / duration) *
                100
              ).toFixed(2)}%, #535353 0%)`,
            }}
          />
          <span className="text-sm text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="text-gray-300 hover:text-white cursor-pointer transition-all">
          {isMuted || volume === 0 ? (
            <FaVolumeMute className="text-2xl" />
          ) : (
            <FaVolumeUp className="text-2xl" />
          )}
        </button>
        <input
          type="range"
          className="w-24 accent-green-500 bg-gray-700 rounded-full appearance-none h-1 cursor-pointer"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />
      </div>

      <audio ref={audioRef} preload="auto" src={track?.audio}></audio>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default Player;
