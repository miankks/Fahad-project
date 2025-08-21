import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

// Firebase image store rules
//allow read;
//allow write: if request.resource.size < 2* 1024 * 1024
//request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file])

  const handleFileUpload = () => {
    const storage = getStorage(app);
    // by adding time we always get the latest file even if user add image two times. 
    // The latest will be added.
    const fileName = new Date().getTime() + file.name;
    // without avatars path it will not create folder in firebase
    const storageRef = ref(storage, `avatars/${fileName}`);
    // to show the file load percentage when loading
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))        
      },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => setFormData({...formData, avatar: downloadURL}) 
    )
    })
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  // for image use self-center in image tag
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} 
              src={formData?.avatar || currentUser.avatar} alt="profile" 
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileUploadError ? 
            (<span className='text-red-700'>Error image upload (Image must be less than 2mb)
            </span>) :
               filePerc > 0 && filePerc < 100 ? (
               <span className='text-slate-700'>
                {`Uploading ${filePerc}%`} 
                </span>) 
                : 
                filePerc === 100? (
                <span className='text-green-700'>Image
                 Successfully uploaded</span>)
                : (
                ''
                )}
        </p>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'
            defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'
            defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'
                onChange={handleChange}/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95
                  disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between m-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile