/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { usePlayerContext } from "../context/PlayerProvider";
import { useApiCallContext } from "../context/ApiCallProvider";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import spotify_logo from "../assets/spotify_logo.png";
import { FaPlay, FaPlus, FaRegTrashCan } from "react-icons/fa6";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { updateTrack, playWithId } = usePlayerContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { getAlbumDetails, albumDetails } = useApiCallContext();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { playListDetails, playLists, getplayList } = useApiCallContext();

  useEffect(() => {
    getAlbumDetails(id);
    getplayList();
  }, [id]);

  const calculateTotalDuration = (songs) => {
    if (!songs || songs.length === 0) return "0hr 0min";
  
    // Calculate total duration in seconds
    const totalDurationInSeconds = songs.reduce((total, song) => total + song.duration, 0);
  
    // Convert total seconds to hours and minutes
    const hours = Math.floor(totalDurationInSeconds / 3600);
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
  
    return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
  };

  const totalDuration = calculateTotalDuration(albumDetails?.songs);

  return (
    <div className="mt-5 w-full">
      <Navbar />
      <div className="overflow-y-auto max-h-[550px] mt-10 p-8 text-white ">
        <div
          className=" p-8 text-white"
          style={{
            background: `linear-gradient(0deg, black, ${
              albumDetails?.albumColor || "#1db954"
            })`,
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
              <p>Album</p>
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
                <b> • {albumDetails?.saves || "0"} saves</b>•{" "}
                <b>{albumDetails?.songs?.length || "0"} songs,</b>
                <span className="text-white"> about {totalDuration}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto ">
          {" "}
          <div className="mt-10 mb-4 pl-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-[#a7a7a7]">
                <thead className="bg-[#1a1a1a] text-sm sm:text-base uppercase">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4 hidden sm:table-cell">
                      Album Name
                    </th>

                    <th className="py-3 px-4 hidden sm:table-cell">
                      Song Date
                    </th>
                    <th className="py-3 px-4 hidden sm:table-cell">
                      <img className=" w-4" src={assets.clock_icon} alt="" />
                    </th>
                    <th>Play</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {albumDetails?.songs.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#ffffff2b] cursor-pointer"
                    >
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.songName}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>
                      <td>
                        <span className="text-white text-sm md:text-base">
                          {item.songName?.slice(0, 20)}
                        </span>{" "}
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 hidden sm:table-cell">
                        {Math.floor(item.duration / 60)}:{item.duration % 60}
                      </td>
                      <td>  <button
                          className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                          onClick={() => updateTrack(item, albumDetails?.songs)}
                        >
                          <FaPlay className="text-white" />
                        </button> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-black text-white p-6 mt-10">
            <h2 className="text-2xl font-bold mb-6">More Songs You May Like</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for songs or playlists..."
                className="w-2/4 p-3 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleSearchChange}
              />
            </div>
            <div className="w-full" style={{ width: "80%" }}>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={2}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 5 },
                }}
                className="swiper-custom"
              >
                {playLists.map((playlist, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
                      {/* Playlist Image */}
                      <img
                        src={playlist.image}
                        alt={playlist.title}
                        className="w-full h-40 object-cover"
                      />

                      {/* Play Button */}
                      <div className="absolute bottom-4 right-4">
                        <button
                          className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                          onClick={() => updateTrack(playlist, playLists)}
                        >
                          <FaPlay />
                        </button>
                      </div>

                      {/* Add to Playlist Icon (Visible on Hover) */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Playlist Details */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold truncate">
                          {playlist.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                          By {playlist.singerName}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAlbum;
