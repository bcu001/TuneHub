import UploadSong from '@/components/admin/UploadSong';
import axios from 'axios';
import React, { useState } from 'react'
import { X } from 'lucide-react';

const col = [
  "songID",
  "songName",
  "duration",
  "likes",
  "songImage",
  "artist",
  "writer",
  "releaseDate",
  "category",
  "location"
]


const ContentManagement = () => {
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = () => {
    setIsUploading(true);
  }
  return (
    <div className='relative'>
      <div>
        {isUploading && (
          <>
            <UploadSong setIsUploading={setIsUploading} />
          </>
        )}
      </div>

      <button onClick={handleUpload} className='border  px-3 py-2 rounded-lg bg-blue-500 cursor-pointer active:scale-95'>Add new Song</button>
    </div>
  )
}

export default ContentManagement
