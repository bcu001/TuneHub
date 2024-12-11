import React,{useEffect} from 'react'
import User from "../../components/user/User"

const Contact = () => {

  useEffect(()=>{
    document.title = "TuneHub | Contact";
  },[])

  return (
    <>
    <div>Contact</div>
    <User/>
    </>
  )
}

export default Contact