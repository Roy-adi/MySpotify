/* eslint-disable no-unused-vars */
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

const AlbumEdit = () => {
  const { id } = useParams();
  const { getAlbumDetails, albumDetails, getplayList, playLists,editAlbum } =
    useApiCallContext();

  const [formData, setFormData] = useState({
    albumName: "",
    albumDescription: "",
    albumColor: "",
    albumImg: "",
    songs: [],
  });
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    if (id) {
      getAlbumDetails(id);
    }
    getplayList();
  }, [id]);

  useEffect(() => {
    if (albumDetails) {
      setFormData({
        albumName: albumDetails.albumName || "",
        albumDescription: albumDetails.albumDescription || "",
        albumColor: albumDetails.albumColor || "",
        albumImg: albumDetails.albumImg || "",
        songs: albumDetails.songs || [],
      });
      setSelectedSongs(albumDetails.songs.map((song) => song._id));
    }
  }, [albumDetails]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

console.log(selectedSongs,'selectedSongs')

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
      albumImg: file,
    }));
  }
};

  const handleEdit = () => {

    const dataToSend = new FormData();
    dataToSend.append("albumName", formData.albumName);
    dataToSend.append("albumDescription", formData.albumDescription);
    dataToSend.append("albumColor", formData.albumColor);
    dataToSend.append("image", formData.albumImg);
     const addSongs = selectedSongs.join(",");
  dataToSend.append("addSongs", addSongs);
    editAlbum(id, dataToSend); 
  };

  console.log(albumDetails, "albumDetails");

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white">
        <AdminStats />
        <div className=" bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Album</h2>
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
                  Album Name
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="albumName"
                  value={formData.albumName}
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
                  Album Description
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="albumDescription"
                  value={formData.albumDescription}
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
                  Album Color
                </InputLabel>
                <input
                  type="color"
                  name="albumColor"
                  value={formData.albumColor}
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
                  Album Image
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
                           hover:file:bg-blue-700 bg-white mt-8"
                />
              </div>
              <div className="md:col-span-2">
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
                    value={selectedSongs.map(
                      (songId) =>
                        playLists.find((song) => song._id === songId) || null
                    )}
                    onChange={(event, newValue) => {
                      const selectedIds = newValue.map((song) => song._id);
                      setSelectedSongs(selectedIds);
                    }}
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

export default AlbumEdit;
