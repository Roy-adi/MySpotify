
import { usePlayerContext } from "../context/PlayerProvider";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import spotify_logo from "../assets/spotify_logo.png";
const Player = () => {
 

  const { track, playStatus, play, pause, next, previous, audioRef } =usePlayerContext();

  return (
    <div className="h-[10%] bg-gradient-to-r from-gray-900 to-black flex justify-between items-center text-white px-6 py-3 shadow-lg">
      {/* Current Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          className="w-16 h-16 object-cover rounded-md"
          src={track?.image || spotify_logo}
          alt="Track"
        />
        <div>
          <p className="text-lg font-semibold truncate">{track?.songName || "No Track"}</p>
          <p className="text-sm text-gray-400 truncate">
            {track?.description?.slice(0, 50) || "Select a track to start playing"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-6">
          <FaStepBackward
            onClick={previous}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-all"
          />
          {playStatus ? (
            <FaPause
              onClick={pause}
              className="text-3xl text-green-500 hover:text-white cursor-pointer transition-all"
            />
          ) : (
            <FaPlay
              onClick={play}
              className="text-3xl text-green-500 hover:text-white cursor-pointer transition-all"
            />
          )}
          <FaStepForward
            onClick={next}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer transition-all"
          />
        </div>
      </div>

      {/* Empty Spacer for Responsive Design */}
      <div className="hidden lg:block"></div>

      <audio ref={audioRef} preload="auto"></audio>
    </div>
  );
};

export default Player;
