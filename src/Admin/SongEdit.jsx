/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminStats from "./AdminStats";
import { useApiCallContext } from "../context/ApiCallProvider";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  Autocomplete,
  FormGroup,
} from "@mui/material";

const SongEdit = () => {
  const { id } = useParams();
  const { getSongDetails, songDetails, editsong, getplayList, playLists } =
    useApiCallContext();

  const [formData, setFormData] = useState({
    songName: "",
    description: "",
    singerName: "",
    image: "",
    audio: "",
    duration: "",
  });

  useEffect(() => {
    if (id) {
      getSongDetails(id);
    }
    getplayList();
  }, [id]);

  useEffect(() => {
    if (songDetails) {
      setFormData({
        songName: songDetails.songName || "",
        description: songDetails.description || "",
        singerName: songDetails.singerName || "",
        image: songDetails.image || "",
        audio: songDetails.audio || "",
        duration: songDetails.duration || "",
      });
    }
  }, [songDetails]);

  const handleInputChange = (e) => {
   const { name, value, files, type } = e.target;
 
   setFormData({
     ...formData,
     [name]: type === "file" ? files[0] : value, // Handle file input or normal text input
   });
 };
 



  const handleImageUpload = (file) => {
    if (file) {
      // Validate file type (optional)
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG/PNG).");
        return;
      }

      // Update the formData state with the selected file
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleEdit = () => {
    const dataToSend = new FormData();
    dataToSend.append("songName", formData.songName);
    dataToSend.append("description", formData.description);
    dataToSend.append("duration", formData.duration);
    dataToSend.append("image", formData.image);
    dataToSend.append("audio", formData.audio);
    dataToSend.append("singerName", formData.singerName);

    editsong(id,dataToSend)
  };

  console.log(songDetails, "songDetails");

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <AdminStats />
        <div className=" bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Song</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <InputLabel
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Song Name
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="songName"
                  value={formData.songName}
                  onChange={handleInputChange}
                  className="bg-white rounded"
                />
              </div>
              <div>
                <InputLabel
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Song Description
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-white text-black rounded"
                />
              </div>
              <div>
                <InputLabel
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Duration (in seconds)
                </InputLabel>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full h-10 p-1 rounded border border-gray-300 mt-3"
                  style={{ background: "white" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div className="md:col-span-1">
                <InputLabel
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Song Image
                </InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="block w-full text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-500 file:text-white
                           hover:file:bg-blue-700 bg-white mt-6"
                />
              </div>
              <div className="">
                <div>
                  <InputLabel
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Audio
                  </InputLabel>
                  <input
                    type="file" // Set input type to 'file'
                    name="audio"
                    accept="audio/*" // Accept only audio files (e.g., mp3, wav, etc.)
                    onChange={handleInputChange}
                    className="w-full h-10 p-1 rounded border border-gray-300 mt-3"
                    style={{ background: "white" }}
                  />
                </div>
              </div>
              <div>
                <InputLabel
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Artist
                </InputLabel>
                <input
                  type="text"
                  name="singerName"
                  value={formData.singerName}
                  onChange={handleInputChange}
                  className="w-full h-10 p-1 rounded border border-gray-300 mt-3"
                  style={{ background: "white" }}
                />
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongEdit;
