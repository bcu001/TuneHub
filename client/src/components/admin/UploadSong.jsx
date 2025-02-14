import axios from 'axios';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const UploadSong = ({}) => {
    const [file, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('song', file);
        await axios.post("http://localhost:3000/api/upload/image", formData)
            .catch(err => console.log(err));
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='relative bg-white p-4 rounded-lg w-[90%] max-w-[350px] shadow-lg'>
                
                <h2 className='text-center font-bold text-lg mb-3'>Upload Song</h2>
                <form>
                    <div className='mb-2'>
                        <label htmlFor="sName" className='block text-sm font-medium'>Song Name</label>
                        <input className='border w-full p-1 rounded' type="text" name="sName" id="sName" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="sAudio" className='block text-sm font-medium'>Song Audio</label>
                        <input className='border w-full p-1 rounded' onChange={handleFile} type="file" name='sAudio' id="sAudio" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="sImage" className='block text-sm font-medium'>Song Image</label>
                        <input className='border w-full p-1 rounded' onChange={handleFile} type="file" name='sImage' id="sImage" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="sArtist" className='block text-sm font-medium'>Song Artist</label>
                        <input className='border w-full p-1 rounded' type="text" name="sArtist" id="sArtist" />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="category" className='block text-sm font-medium'>Category</label>
                        <select className='border w-full p-1 rounded' name="category" id="category">
                            <option value="pop">Pop</option>
                            <option value="rock">Rock</option>
                            <option value="hip-hop">Hip Hop</option>
                            <option value="jazz">Jazz</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="r&b">R&B</option>
                            <option value="country">Country</option>
                            <option value="reggae">Reggae</option>
                            <option value="folk">Folk</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="srd" className='block text-sm font-medium'>Release Date</label>
                        <input className='border w-full p-1 rounded' type="date" name="srd" id="srd" />
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-red-500 px-3 py-1 rounded-lg text-white text-sm' type='button'>Cancel</button>
                        <button className='bg-green-500 px-3 py-1 rounded-lg text-white text-sm' type='submit' onClick={handleUpload}>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadSong;