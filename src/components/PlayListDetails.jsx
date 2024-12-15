/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { FaUserPlus } from "react-icons/fa";
import spotify_logo from "../assets/spotify_logo.png";
import img9 from "../assets/img9.jpg";
import { useApiCallContext } from "../context/ApiCallProvider";
import { FaPlay, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { usePlayerContext } from "../context/PlayerProvider";

const PlayListDetails = () => {
  const { id } = useParams();
  const albumData = albumsData[id];

  const { updateTrack, playWithId } = usePlayerContext();

  const {
    getplayListdetails,
    playListDetails,
    getplayList,
    playLists,
    addSongToPlayList,
    removeSongToPlayList,
    getUserList,
    userLists,
  } = useApiCallContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  console.log(userLists,'userLists')

  const handleSearch = (query) => {
    const dataToSend = {
      keyword: query,
    }
    getUserList(dataToSend)
  };

  useEffect(() => {
    if (id) {
      const dataToSend = {
        keyword: searchTerm,
      };
      getplayListdetails(id);
      getplayList(dataToSend);
      getUserList();
    }
  }, [id, searchTerm]);

  const handleAddCollaborator = (user) => {
    // Logic to add a collaborator for the playlist
    console.log("Add Collaborator:", user);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToPlaylist = (song) => {
    const dataToSend = {
      songId: song._id,
      playlistId: playListDetails._id,
    };
    console.log("Payload:", dataToSend);
    addSongToPlayList(dataToSend);
  };

  const handleDeleteFromPlaylist = (id) => {
    const dataToSend = {
      songId: id,
      playlistId: playListDetails._id,
    };
    console.log("Payload:", dataToSend);
    removeSongToPlayList(dataToSend);
  };

  return (
    <div className="mt-5 w-full">
      <Navbar />
      <div className="overflow-y-auto max-h-[550px] ">
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end text-white">
          <img
            className="w-48 rounded"
            src={playListDetails.playlistImg}
            alt=""
          />
          <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">
              {playListDetails.playlistName}{" "}
            </h2>
            <h4>{albumData?.desc}</h4>
            <p className="mt-1">
              <img className="inline-block w-5" src={spotify_logo} alt="" />
              <b> Spotify </b>
              <b>• {playListDetails?.ownerDetails?.name} </b>•{" "}
              <b>{playListDetails?.songDetails?.length} songs,</b>
              <span className="text-[#a7a7a7]"> about 2hr 30 min</span>
              <button
                className="ml-3 px-4 py-1 bg-blue-600 text-white rounded-md"
                onClick={() => setShowModal(true)}
              >
                Collaborator
              </button>
            </p>
          </div>
        </div>

        <div className="overflow-y-auto ">
          {" "}
          <div className="mt-10 mb-4 pl-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-[#a7a7a7]">
                <thead className="bg-[#1a1a1a] text-sm sm:text-base uppercase">
                  <tr>
                    <th className="py-3 px-4">Song Name</th>
                    <th className="py-3 px-4 hidden sm:table-cell">
                      Description
                    </th>

                    <th className="py-3 px-4 hidden sm:table-cell">Singer</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2a]">
                  {playListDetails.songDetails?.map((item, index) => (
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
                        <span className="text-white text-sm md:text-base">
                          {item.songName.slice(0, 20)}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        {item.description.slice(0, 20)}
                      </td>

                      <td className="py-3 px-4 hidden sm:table-cell">
                        {item.singerName}
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <FaRegTrashCan
                          color="red"
                          onClick={() => handleDeleteFromPlaylist(item._id)}
                        />
                      </td>
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
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleAddToPlaylist(playlist)}
                          className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-green-500 hover:scale-105 transition-all"
                        >
                          <FaPlus />
                        </button>
                      </div>

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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Collaborators</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search for collaborators..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <ul className="space-y-4">
                {userLists?.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-12 h-12 rounded-full mr-4 border border-gray-200 shadow-sm"
                      />
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </div>
                    <button
                      className="text-green-600 hover:text-green-800 transition duration-200"
                      onClick={() => handleAddCollaborator(user)}
                    >
                      <FaUserPlus size={24} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        
    </div>
  );
};

export default PlayListDetails;
