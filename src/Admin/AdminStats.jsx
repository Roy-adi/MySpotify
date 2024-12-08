import React from "react";
import { LuDiscAlbum } from "react-icons/lu";
import { GiMusicalNotes } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import spotify_logo from "../assets/spotify_logo.png";
import { IoMusicalNotes } from "react-icons/io5";
const AdminStats = () => {
  return (
    <>
      <header className="p-6">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <img src={spotify_logo} className="w-8" />
          Spotify Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Manage your music catalog</p>
      </header>

      <div className="grid grid-cols-4 gap-6 px-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-green-500 blur-md"></div>
            <IoMusicalNotes className="text-green-500 text-4xl relative" />
          </div>
          <div>
            <div className="text-3xl font-bold">14</div>
            <p className="text-gray-400 mt-1">Total Songs</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-md"></div>
            <LuDiscAlbum className="text-blue-500 text-4xl relative" />
          </div>
          <div>
            <div className="text-3xl font-bold">4</div>
            <p className="text-gray-400 mt-1">Total Albums</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-purple-500 blur-md"></div>
            <GiMusicalNotes className="text-purple-500 text-4xl relative" />
          </div>
          <div>
            <div className="text-3xl font-bold">15</div>
            <p className="text-gray-400 mt-1">Total Artists</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-yellow-500 blur-md"></div>
            <FaUsers className="text-yellow-500 text-4xl relative" />
          </div>
          <div>
            <div className="text-3xl font-bold">3</div>
            <p className="text-gray-400 mt-1">Total Users</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStats;
