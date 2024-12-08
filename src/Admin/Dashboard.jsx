import React, { useEffect, useState } from "react";
import { IoMusicalNotes } from "react-icons/io5";
import { GiMusicSpell } from "react-icons/gi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useApiCallContext } from "../context/ApiCallProvider";
import AdminStats from "./AdminStats";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate()
  const { getplayList, playLists,getAlbumList,albumLists } = useApiCallContext();

  console.log(albumLists,'albumLists')

  const [activeTab, setActiveTab] = useState("songs");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [albumSearchKeyword, setAlbumSearchKeyword] = useState("");

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

  useEffect(()=>{
    const dataToSend = {
      keyword: albumSearchKeyword,
    };
    getAlbumList(dataToSend);
  },[])


const handeleEdit = (id)=>{
   navigate(`/editAlbum/${id}`)
}


  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <AdminStats />

      <div className="flex justify-start space-x-6 px-6 mb-4">
        <button
          onClick={() => setActiveTab("songs")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "songs"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Songs
        </button>
        <button
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "albums"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300"
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
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
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
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold">
                <IoMusicalNotes className="text-white" />
                Add Song
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <table className="w-full text-left">
                <thead className="bg-gray-700 text-gray-400">
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
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600`}
                    >
                      <td className="px-6 py-3">
                        {" "}
                        <img className="w-10" src={song.image} />{" "}
                      </td>
                      <td className="px-6 py-3">{song.songName}</td>
                      <td className="px-6 py-3">{song.singerName}</td>
                      <td className="px-6 py-3">{song.album.albumName}</td>
                      <td className="px-6 py-3 text-center flex justify-center space-x-4">
                        <button
                          className="p-2 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Delete"
                        >
                          <MdOutlineDeleteOutline
                            style={{ fontSize: "22px" }}
                          />
                        </button>
                        <button
                          className="p-2 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Edit"
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
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold">
                <IoMusicalNotes className="text-white" />
                Add Album
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <table className="w-full text-left">
                <thead className="bg-gray-700 text-gray-400">
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
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                      } hover:bg-gray-600`}
                    >
                      <td className="px-6 py-3">{album.albumName}</td>
                      <td className="px-6 py-3">{album.albumColor}</td>
                      <td className="px-6 py-3">{album.createdAt}</td>
                       <td className="px-6 py-3 text-center flex justify-center space-x-4">
                        <button
                          className="p-2 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Delete"
                        >
                          <MdOutlineDeleteOutline
                            style={{ fontSize: "22px" }}
                          />
                        </button>
                        <button
                          className="p-2 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-md hover:shadow-lg transition duration-300"
                          title="Edit" onClick={()=> handeleEdit(album._id)}
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
    </div>
  );
};

export default Dashboard;
