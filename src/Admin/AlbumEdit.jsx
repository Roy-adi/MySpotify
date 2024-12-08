import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminStats from './AdminStats'
import { useApiCallContext } from '../context/ApiCallProvider'

const AlbumEdit = () => {
 const {id} = useParams()
 const { getAlbumDetails,albumDetails } = useApiCallContext();



 
 
 useEffect(()=>{
  if(id){
   getAlbumDetails(id)
  }
 },[id])

 console.log(albumDetails,'albumDetails')



  return (
   <>
   <div className="w-full min-h-screen bg-gray-900 text-white">
   <AdminStats />

   </div>
   </>
  )
}

export default AlbumEdit