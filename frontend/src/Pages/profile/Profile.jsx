import React, {useEffect} from 'react'

const Profile = () => {

  useEffect(()=>{
    document.title = "TuneHub | Profile";
  },[])

  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
