/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { usePlayerContext } from "../context/PlayerProvider";
import { useApiCallContext } from "../context/ApiCallProvider";
import { useEffect } from "react";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { updateTrack, playWithId } = usePlayerContext();

  const { getAlbumDetails, albumDetails } = useApiCallContext();

  useEffect(() => {
    getAlbumDetails(id);
  }, [id]);

  return (
    <div className="mt-5 w-full">
      <Navbar />
      <div
      className="mt-10 p-8 text-white"
      style={{
        background: `linear-gradient(180deg, black, ${albumDetails?.albumColor || "#1db954"})`,
        borderRadius: "10px",
      }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end">
        <img
          className="w-48 rounded"
          src={albumDetails?.albumImg || "/default-album-image.png"} // Fallback image
          alt={albumDetails?.albumName || "Album cover"}
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumDetails?.albumName || "Unknown Album"}
          </h2>
          <h4 className="text-lg text-[#dcdcdc] mb-4">
            {albumDetails?.albumDescription || "No description available"}
          </h4>
          <p className="mt-1 text-sm flex items-center gap-2">
            <img
              className="w-5"
              src={assets.spotify_logo || "/default-spotify-logo.png"} // Fallback logo
              alt="Spotify logo"
            />
            <b>Spotify</b>
            <b> • {albumDetails?.saves || "0"} saves</b>
            • <b>{albumDetails?.songs?.length || "0"} songs,</b>
            <span className="text-white"> about 2hr 30 min</span>
          </p>
        </div>
      </div>
    </div>
    

      {/* Song List Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />

      {/* Song List Container */}
      <div className="overflow-y-auto max-h-[250px]">
        {" "}
        {/* Set max height and enable scroll */}
        {albumDetails?.songs.map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={item._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <div className="text-white text-sm md:text-[15px]">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                className="inline w-10 mb-5 mr-5"
                src={item.image}
                alt={item?.songName}
              />
              <div className="inline-block">
                <div>{item?.songName.slice(0, 20)}</div>
                <div className="text-[#a7a7a7] text-sm">
                  {item?.description.slice(0, 20)}
                </div>
              </div>
            </div>
            <p className="text-[15px]">{albumDetails?.albumName}</p>
            <p className="text-[15px] hidden sm:block">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <p className="text-[15px] text-center">
              {Math.floor(item.duration / 60)}:{item.duration % 60}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAlbum;
