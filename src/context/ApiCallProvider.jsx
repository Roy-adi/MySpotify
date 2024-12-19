/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types

export const ApiCallProvider = ({ children }) => {
  const base_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken");
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});

  const [playListData, setplayListData] = useState([]);
  const [playListDetails, setplayListDetails] = useState([]);
  const [playLists, setplayLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [albumLists, setAlbumLists] = useState([]);
  const [albumDetails, setAlbumDetails] = useState();
  const [songDetails, setSongDetails] = useState();
  const [dashboardCount, setDashboardCount] = useState();
  const [collaborationList, setCollaborationList] = useState();

  const authUsers = async () => {
    try {
      const response = await axios.post(
        `${base_url}/callback`,
        {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          imageUrl: user?.imageUrl,
        },
        {
          headers: {},
        }
      );
      if (response.status === 200) {
        toast.success("SignIN successful");
        getCmsList(); // Refresh the banner list after success
      } else {
        toast.error("Failed to SignIn");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("failed to SignIn");
    }
  };

  const userDetailsCall = async () => {
    try {

      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${base_url}/userDetails`,
        {}, 
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Handle the response as needed
      // console.log("user Details:", response.data);
      setUserData(response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const SignUpUser = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/signup`,
        {
          ...dataToSend,
        },
        {
          headers: {},
        }
      );

      if (response.status === 201) {
        // Store access token and name in localStorage
        localStorage.setItem("accessToken", response.data.user.accessToken);
        localStorage.setItem("name", response.data.user.name);

        // Display success notification
        toast.success("Successfully logged in!");
        userDetailsCall()
      } else {
        toast.error("Failed to Signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    }
  };


  const loginUser = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/login`,
        {
          ...dataToSend,
        },
        {
          headers: {},
        }
      );

      if (response.status === 200) {
        // Store access token and name in localStorage
        localStorage.setItem("accessToken", response.data.user.accessToken);
        localStorage.setItem("name", response.data.user.name);

        // Display success notification
        toast.success("Successfully logged in!");
        userDetailsCall()
      } else {
        toast.error("Failed to Signup");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    }
  };


  const CreatePlayList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/createPlaylist`,
        dataToSend, 
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Details failed:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const playList = async () => {
    try {

      const response = await axios.get(
        `${base_url}/playlists`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setplayListData(response.data.playlists);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };



    const getplayListdetails = async (playlistId) => {
    try {

      const response = await axios.get(
        `${base_url}/playlist/${playlistId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setplayListDetails(response.data.playlist);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };



  const getplayList = async (dataToSend) => {
    try {

      const response = await axios.post(
        `${base_url}/songs`,{...dataToSend},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setplayLists(response.data.songs);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const addSongToPlayList = async (dataToSend) => {
    try {
     const {playlistId} = dataToSend
      const response = await axios.post(
        `${base_url}/addSongToPlaylist`,
        { ...dataToSend },
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      // Check if the response status is 200
      if (response.status === 200) {
        toast.success("Successfully Song Added");
        getplayListdetails(playlistId)
      } else {
        toast.error("Failed to add song to the playlist");
      }
    } catch (error) {
      // Handle the error and show an error toast
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while adding the song");
    }
  };

  const removeSongToPlayList = async (dataToSend) => {
    try {
      const {playlistId} = dataToSend
      const response = await axios.post(
        `${base_url}/playlist/remove-song`,
        { ...dataToSend },
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      // Check if the response status is 200
      if (response.status === 200) {
        toast.success("Successfully Song remove");
        getplayListdetails(playlistId)
      } else {
        toast.error("Failed to remove song to the playlist");
      }
    } catch (error) {
      // Handle the error and show an error toast
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred while remove the song");
    }
  };
  

  const getUserList = async (dataToSend) => {
    try {

      const response = await axios.post(
        `${base_url}/allusers`,{...dataToSend},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUserLists(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getAlbumList = async () => {
    try {

      const response = await axios.get(
        `${base_url}/allAlbums`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAlbumLists(response.data.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const getAlbumDetails = async (albumId) => {
    try {

      const response = await axios.get(
        `${base_url}/albumDetails/${albumId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAlbumDetails(response.data);
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const editAlbum = async (albumId, dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/editAlbum/${albumId}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully updated Album");
        navigate('/dashboard')
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const getSongDetails = async (songId) => {
    try {

      const response = await axios.get(
        `${base_url}/songDetails/${songId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        setSongDetails(response.data);
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const editsong = async (songId, dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/editSong/${songId}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully updated Album");
        navigate('/dashboard')
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  
  const addAlbum = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/addalbum`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully updated Album");
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const addSong = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/addSong`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully updated Album");
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const deleteSong = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/deleteSong/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully delete song");
        getplayList()
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/deleteAlbum/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully delete Album");
        getAlbumList()
      }
    } catch (error) {
      // Handle the error   
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const getDashboardCount = async () => {
    try {

      const response = await axios.get(
        `${base_url}/dashboard/Count`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if(response.status === 200){
        setDashboardCount(response.data);
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const editPlaylist = async (playlistId, dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/editplaylists/${playlistId}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully updated paylist");
        getplayListdetails(playlistId)
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const sendReq = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/sendReqToCollaborator`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Successfully updated Album");
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const getCollaborationList = async () => {
    try {

      const response = await axios.get(
        `${base_url}/Collaboration/list`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if(response.status === 200){
        setCollaborationList(response.data);
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const CollaborationReq = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/Collaboration/response`,
        {...dataToSend},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Playlist has been successfully accepted");
        getCollaborationList()
      }
    } catch (error) {
      // Handle the error
      console.error(
        "details failed:",
        error.response ? error.response.data : error.message
      );
    }
  };



  const values = {
    authUsers,
    SignUpUser,userDetailsCall,loginUser,userData,CreatePlayList,playList, playListData,getplayListdetails, playListDetails,getplayList,playLists,addSongToPlayList,removeSongToPlayList,getUserList,userLists,getAlbumList,albumLists,getAlbumDetails,albumDetails,editAlbum,getSongDetails,songDetails,editsong,addAlbum,addSong,deleteSong,deleteAlbum,getDashboardCount,dashboardCount,editPlaylist,sendReq,getCollaborationList,collaborationList,CollaborationReq
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useApiCallContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
