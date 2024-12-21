/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoMusicalNotes } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useApiCallContext } from "../context/ApiCallProvider";
import AdminStats from "./AdminStats";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Autocomplete, FormGroup, InputLabel, TextField } from "@mui/material";
const Dashboard = () => {
  const navigate = useNavigate();
  const { getplayList, playLists, getAlbumList, albumLists,addAlbum,addSong,deleteSong,deleteAlbum } =
    useApiCallContext();

  const [activeTab, setActiveTab] = useState("songs");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [albumSearchKeyword, setAlbumSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSongModalOpen, setisSongModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [previewSongImg, setPreviewSongImg] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const [formData, setFormData] = useState({
    albumName: "",
    albumDescription: "",
    albumColor: "",
    image: "",
  });

  const [songData, setSongData] = useState({
    songName: "",
    description: "",
    singerName: "",
    album: "",
    image: "",
    audio: "",
    duration: "",
  });

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    console.log("Search Keyword:", keyword); // This can be used for API payload
  };

  const handleAlbumChange = (e) => {
    const keyword = e.target.value;
    setAlbumSearchKeyword(keyword);
    console.log("Search Keyword:", keyword);
  };

  useEffect(() => {
    const dataToSend = {
      keyword: searchKeyword,
    };
    getplayList(dataToSend);
  }, [searchKeyword]);

  useEffect(() => {
    const dataToSend = {
      keyword: albumSearchKeyword,
    };
    getAlbumList(dataToSend);
  }, []);

  const handeleEdit = (id) => {
    navigate(`/editAlbum/${id}`);
  };

  const handeleSongEdit = (id) => {
    navigate(`/editSong/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the state based on input name
    }));
  };

  // Handle file input change

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Update state with file object
      }));
      setPreviewImg(URL.createObjectURL(file)); // Generate and set preview URL
    }
  };


  const handleSongFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setSongData((prevData) => ({
        ...prevData,
        image: file, // Update state with file object
      }));
      setPreviewSongImg(URL.createObjectURL(file)); // Generate and set preview URL
    }
  };


  const handleremoveSongImg = () => {
    setSongData((prevData) => ({
     ...prevData,
      image: null, // Reset state
    }));
    setPreviewSongImg(null); // Reset preview URL
  }

  const handleremoveAlbumImg = () =>{
    setFormData((prevData) => ({
     ...prevData,
      image: null, // Reset state
    }));
    setPreviewImg(null); // Reset preview URL
  }



  const handleCreatePlaylist = () => {

    const allSelectedSongsIds = [
      ...selectedSongs.map(product => product._id)
    ];

    const payload = new FormData();
    payload.append("albumName", formData?.albumName);
    payload.append("albumDescription", formData.albumDescription);
    payload.append("image", formData.image);
    payload.append("albumColor", formData.albumColor);
    const addSongs = allSelectedSongsIds.join(",");
    payload.append("songIds", addSongs);
    addAlbum(payload);
    setIsModalOpen(false);
  };


  const handleSaveSong = () => {
    const payload = new FormData();
    payload.append("songName", songData.songName);
    payload.append("image", songData.image);
    payload.append("description", songData.description);
    payload.append("singerName", songData.singerName);
    payload.append("album", songData.album);
    payload.append("duration", songData.duration);
    payload.append("audio", songData.audio);

    addSong(payload);
    setisSongModalOpen(false);
  };


  const handleDeleteSong = (id) => {
    deleteSong(id);
  };

  const handleDeleteAlbum = (id) => {
    deleteAlbum(id);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <AdminStats />

      <div className="flex justify-start space-x-6 px-6 mb-4">
        <button
          onClick={() => setActiveTab("songs")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "songs"
              ? "bg-green-600 text-white"
              : " text-white-300"
          }`}
        >
          Songs
        </button>
        <button
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "albums"
              ? "bg-green-600 text-white"
              : " text-white-300"
          }`}
        >
          Albums
        </button>
        <div className="w-2/5">
          {activeTab === "songs" && (
            <input
              type="text"
              placeholder="Search songs..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="w-full px-4 py-2  border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          )}
          {activeTab === "albums" && (
            <input
              type="text"
              placeholder="Search albums..."
              value={albumSearchKeyword}
              onChange={handleAlbumChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white-300 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          )}
        </div>
      </div>

      <div className="px-6">
        {activeTab === "songs" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <GiMusicSpell className="text-green-500" />
                Songs Library
              </h2>
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold" onClick={() => setisSongModalOpen(true)}>
                <IoMusicalNotes className="text-white" />
                Add Song
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <table className="w-full text-left">
                <thead className=" text-white-400">
                  <tr>
                    <th className="px-6 py-3">Img</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Artist</th>
                    <th className="px-6 py-3">Album</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {playLists.map((song, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : ""
                      } hover:bg-gray-600`}
                    >
                      <td className="px-6 py-3">
                        {" "}
                        <img className="w-10" src={song.image} />{" "}
                      </td>
                      <td className="px-6 py-3">{song.songName}</td>
                      <td className="px-6 py-3">{song.singerName}</td>
                      <td className="px-6 py-3">{song.album?.albumName}</td>
                      <td className="px-6 py-3 text-center flex justify-center space-x-4">
                        <button
                          className="p-2 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Delete" onClick={()=> handleDeleteSong(song._id)}
                        >
                          <MdOutlineDeleteOutline
                            style={{ fontSize: "22px" }}
                          />
                        </button>
                        <button
                          className="p-2 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Edit"
                          onClick={() => handeleSongEdit(song._id)}
                        >
                          <FaRegEdit style={{ fontSize: "20px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "albums" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <IoMusicalNotes className="text-blue-500" />
                Albums Library
              </h2>
              <button
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold"
                onClick={() => setIsModalOpen(true)}
              >
                <IoMusicalNotes className="text-white" />
                Add Album
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <table className="w-full text-left">
                <thead className=" text-white-400">
                  <tr>
                    <th className="px-6 py-3">Album Title</th>
                    <th className="px-6 py-3">Album Color</th>
                    <th className="px-6 py-3">Release Year</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {albumLists.map((album, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : ""
                      } hover:bg-gray-600`}
                    >
                      <td className="px-6 py-3">{album?.albumName}</td>
                      <td className="px-6 py-3">{album.albumColor}</td>
                      <td className="px-6 py-3">{album.createdAt}</td>
                      <td className="px-6 py-3 text-center flex justify-center space-x-4">
                        <button
                          className="p-2 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Delete" onClick={()=> handleDeleteAlbum(album._id)}
                        >
                          <MdOutlineDeleteOutline
                            style={{ fontSize: "22px" }}
                          />
                        </button>
                        <button
                          className="p-2 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Edit"
                          onClick={() => handeleEdit(album._id)}
                        >
                          <FaRegEdit style={{ fontSize: "20px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity"
          onClick={() => setIsModalOpen(false)} // Close modal on background click
        >
          <div
            className="bg-[#1e1e1e] w-full max-w-md p-6 rounded-lg shadow-xl transition-transform transform scale-95 sm:scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              Create Album
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Album Name
                  </label>
                  <input
                    type="text"
                    name="albumName"
                    value={formData?.albumName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Album Name"
                  />
                </div>
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Album Description
                  </label>
                  <input
                    type="text"
                    name="albumDescription"
                    value={formData.albumDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Album Description"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Album Color
                  </label>
                  <input
                    type="color"
                    name="albumColor"
                    value={formData.albumColor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2"
                  />
                </div>
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Album Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <FormGroup>
                <InputLabel
                  htmlFor="songs"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Add Songs
                </InputLabel>
                <Autocomplete
                  multiple
                  options={playLists || []}
                  getOptionLabel={(option) => option?.songName || ""}
                  value={selectedSongs}
                  onChange={(event, newValue) => setSelectedSongs(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Add Songs"
                      className="bg-white text-black rounded"
                    />
                  )}
                  sx={{ mt: 2 }}
                />
              </FormGroup>
              {previewImg && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="relative">
                    <p className="text-sm text-white-400 mb-2 text-center">
                      Preview:
                    </p>
                    <img
                      src={previewImg}
                      alt="Album Preview"
                      className="rounded-full w-36 h-36"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      onClick={handleremoveAlbumImg}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4 mt-4">
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  onClick={handleCreatePlaylist}
                >
                  Save Playlist
                </button>
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSongModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity"
          onClick={() => setisSongModalOpen(false)} // Close modal on background click
        >
          <div
            className="bg-[#1e1e1e] w-full max-w-md p-6 rounded-lg shadow-xl transition-transform transform scale-95 sm:scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-6 text-white text-center">
              Add New Song
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Song Name
                  </label>
                  <input
                    type="text"
                    name="songName"
                    value={songData.songName}
                    onChange={(e) =>
                      setSongData({ ...songData, songName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Song Name"
                  />
                </div>
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Singer Name
                  </label>
                  <input
                    type="text"
                    name="singerName"
                    value={songData.singerName}
                    onChange={(e) =>
                      setSongData({ ...songData, singerName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Singer Name"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Album
                  </label>
                  <select
                    name="album"
                    value={songData.album}
                    onChange={(e) =>
                      setSongData({ ...songData, album: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded text-black  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Album
                    </option>
                    {albumLists.map((album) => (
                      <option key={album._id} value={album._id}>
                        {album?.albumName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={songData.duration}
                    onChange={(e) =>
                      setSongData({ ...songData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Duration (e.g., 3:45)"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="w-full">
                  <label className="block text-sm text-white-400 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={songData.description}
                    onChange={(e) =>
                      setSongData({ ...songData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded text-black  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter Song Description"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSongFileChange}
                    className="w-full px-3 py-2 rounded text-white  focus:ring-2 bg-white focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[48%]">
                  <label className="block text-sm text-white-400 mb-2">
                    Upload Audio
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setSongData({ ...songData, audio: e.target.files[0] })
                    }
                    className="w-full px-3 py-2 rounded text-white bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
                {previewSongImg && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="relative">
                    <p className="text-sm text-white-400 mb-2 text-center">
                      Preview:
                    </p>
                    <img
                      src={previewSongImg}
                      alt="Album Preview"
                      className="rounded-full w-36 h-36"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      onClick={handleremoveSongImg}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4 mt-4">
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                  onClick={handleSaveSong}
                >
                  Save Song
                </button>
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  onClick={() => setisSongModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
