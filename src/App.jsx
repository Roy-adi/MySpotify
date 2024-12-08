import { useContext } from "react";

import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";

import { Route, Routes, useLocation } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallbackPage from "./AuthCallBack/AuthCallbackPage";


import { Toaster } from "react-hot-toast";
import CreatePlayList from "./components/PlayListDetails";
import DisplayHome from "./components/DisplayHome";
import DisplayAlbum from "./components/DisplayAlbum";
import PlayListDetails from "./components/PlayListDetails";
import { usePlayerContext } from "./context/PlayerProvider";
import Dashboard from "./Admin/Dashboard";
import AlbumEdit from "./Admin/AlbumEdit";

const App = () => {

  const { audioRef, track } = usePlayerContext();

  const location = useLocation(); // Get the current route

  // Check if the current route is "/dashboard"
  const isSpecialRoute = location.pathname === "/dashboard" || location.pathname.startsWith("/editAlbum/");
  return (
    <div className="h-screen bg-black">
    <div className={`h-[90%] flex ${isSpecialRoute ? "justify-center" : ""}`}>
      {/* Conditionally render Sidebar if not on Dashboard */}
      {!isSpecialRoute && <Sidebar />}
      
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/" element={<DisplayHome />} />
        <Route path="/playlist/:id" element={<PlayListDetails />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editAlbum/:id" element={<AlbumEdit />} />
      </Routes>

      <Toaster />
    </div>

    {/* Conditionally render Player and audio if not on Dashboard */}
    {!isSpecialRoute && <Player />}
    {!isSpecialRoute && <audio ref={audioRef} src={track?.file} preload="auto"></audio>}
  </div>
  );
};

export default App;
