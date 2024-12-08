import Navbar from "./Navbar"
import { albumsData } from "../assets/assets"
import AlbumItem from "./AlbumItem"
import { songsData } from "../assets/assets"
import SongItem from "./SongItem"
import { useApiCallContext } from "../context/ApiCallProvider"
import { useEffect } from "react"

const DisplayHome = () => {
 
  const { getAlbumList,albumLists } = useApiCallContext();

  useEffect(() => {
    getAlbumList();
  }, []);


  return (
    <>
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
    <Navbar/>
    <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
        {albumLists.map((item,index)=>(<AlbumItem key={index} name={item.albumName} desc={item.albumDescription} id={item._id
        }
        image={item.albumImg}/>))}
        </div>
    </div>
    <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s biggest hits</h1>
        <div className="flex overflow-auto">
      {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id}
        image={item.image}/>))}
        </div>
    </div>
    </div>
   
    </>
  )
}

export default DisplayHome