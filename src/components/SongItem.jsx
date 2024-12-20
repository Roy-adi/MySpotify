import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { usePlayerContext } from "../context/PlayerProvider";

const SongItem = ({name,image,desc,id}) => {



  return (
    <div  className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">Artist : {desc}</p>
    </div>
  )
}

export default SongItem