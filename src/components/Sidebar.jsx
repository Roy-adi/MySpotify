/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { useApiCallContext } from "../context/ApiCallProvider";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);
  const [formData, setFormData] = useState({
    playlistName: "", // Initialize with an empty string
    playlistImg: null, // Initialize as null
  });

  const [previewImg, setPreviewImg] = useState(null);

  const { CreatePlayList, playList, playListData } = useApiCallContext();

  console.log(playListData , 'Play List')

  const combinedPlaylists = [
    ...(playListData.collaborationPlaylist || []),
    ...(playListData.ownedPlaylists || []),
  ];


  const handlePlayListButtonClick = () => {
    setShowPlayList((prev) => !prev);
    if (!showPlayList) {
      // Call the API only when expanding the playlist view
      playList();
    }
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
        playlistImg: file, // Update state with file object
      }));
      setPreviewImg(URL.createObjectURL(file)); // Generate and set preview URL
    }
  };

  const handleCreatePlaylist = () => {
    const payload = new FormData(); // Use a different name to avoid overwriting
    payload.append("playlistName", formData.playlistName); // Use state values
    payload.append("image", formData.playlistImg); // Use state values

    CreatePlayList(payload); // Pass the correct payload
    setIsModalOpen(false); // Close modal after saving
  };

  const handlenavigate = () => {
    navigate("/create-playlist");
  };
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-b old">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-b old">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
            <p className="font-semibold">Your PlayList</p>
          </div>
          <div className="flex items-center gap-3">
            <button   onClick={handlePlayListButtonClick}>
              <img className="w-5" src={assets.plus_icon} alt="plus_icon" />
            
            </button>
          </div>
        </div>


        <div className="p-4">
        {combinedPlaylists.map((playlist) => (
          <div
            key={playlist._id}
            className="bg-[#242424] flex items-center p-4 rounded mb-3 hover:bg-[#333333] transition duration-200 cursor-pointer"
          >
            <img
              src={playlist.playlistImg || "/path-to-default-image.jpg"} // Fallback image if playlistImg is missing
              alt={playlist.playlistName || "Playlist Image"}
              className="w-12 h-12 rounded"
            />
            <Link to={`/playlist/${playlist._id}`}>
              <div className="ml-4">
                <p className="text-white font-semibold">
                  {playlist.playlistName || "Untitled Playlist"}
                </p>
                <p className="text-gray-400 text-sm">
                  Created on:{" "}
                  {playlist.createdAt
                    ? new Date(playlist.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
        

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create Your Own Paylist</h1>
          <p className="font-light">it's easy we will help you</p>
          <button
            className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
            onClick={() => setIsModalOpen(true)}
          >
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity "
          onClick={() => setIsModalOpen(false)} // Close modal on background click
        >
          <div
            className="bg-[#1e1e1e] w-full max-w-md p-6 rounded-lg shadow-xl transition-transform transform scale-95 sm:scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create Playlist
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Playlist Name
                </label>
                <input
                  type="text"
                  name="playlistName"
                  value={formData.playlistName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter playlist name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Playlist Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="playlistImg" // Name matches the key in formData
                  onChange={handleFileChange} // Updates the file in state
                  className="w-full px-3 py-2 rounded text-white  focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {previewImg && (
                  <div className="mt-4 flex justify-center items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-2 text-center">
                        Preview:
                      </p>
                      <img
                        src={previewImg}
                        alt="Playlist Preview"
                        className="rounded-full w-36 h-36"
                      />
                    </div>
                  </div>
                )}
              </div>
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
      )}

      

    </div>
  );
};

export default Sidebar;
