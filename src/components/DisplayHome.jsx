/* eslint-disable react/jsx-key */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Navbar from "./Navbar"
import AlbumItem from "./AlbumItem"
import { songsData } from "../assets/assets"
import SongItem from "./SongItem"
import { useApiCallContext } from "../context/ApiCallProvider"
import { useEffect, useRef } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePlayerContext } from "../context/PlayerProvider"



const DisplayHome = () => {
  const albumSliderRef = useRef(null);
  const songSliderRef = useRef(null);
  const { getAlbumList,albumLists,getplayList,playLists } = useApiCallContext();
  const { updateTrack, playWithId } = usePlayerContext();

  useEffect(() => {
    getAlbumList();
    getplayList()
  }, []);



  const songSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust the number of slides to display at once
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const handleMouseWheel = (e, sliderRef) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      sliderRef.current.slickPrev();
    } else {
      sliderRef.current.slickNext();
    }
  };
  
  return (
    <>
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
    <Navbar />
    <div className="mb-4">
      <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
      <div
        className="relative group"
        onWheel={(e) => handleMouseWheel(e, albumSliderRef)}
      >
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"
          onClick={() => albumSliderRef.current.slickNext()}

        >
          <FaArrowLeft />
        </button>
        <Slider
        {...songSettings}
        className="overflow-hidden"
        ref={(slider) => (albumSliderRef.current = slider)}
      >
      {albumLists.map((item, index) => (
        <AlbumItem
          key={index}
          name={item.albumName}
          desc={item.albumDescription}
          id={item._id}
          image={item.albumImg}
        />
      ))}
      </Slider>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"
          onClick={() => albumSliderRef.current.slickNext()}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
    <div className="mb-4">
      <h1 className="my-5 font-bold text-2xl">Today&apos;s Biggest Hits</h1>
      <div
        className="relative group"
        onWheel={(e) => handleMouseWheel(e, songSliderRef)}
      >
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"
          onClick={() => songSliderRef.current.slickPrev()} 
        >
          <FaArrowLeft />
        </button>
        <Slider
        {...songSettings}
        className="overflow-hidden"
        ref={(slider) => (songSliderRef.current = slider)}
      >
        {playLists.map((item, index) => (
          <div key={index} onClick={() => updateTrack(item, playLists)}>
          <SongItem
            key={index}
            name={item.songName}
            desc={item.singerName}
            id={item.id}
            image={item.image}
          />
          </div>
        ))}
      </Slider>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 z-10"
          onClick={() => songSliderRef.current.slickNext()}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  </div>
   
    </>
  )
}

export default DisplayHome