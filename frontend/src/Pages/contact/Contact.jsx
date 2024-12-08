import React,{useEffect} from 'react'

const Contact = () => {

  useEffect(()=>{
    document.title = "TuneHub | Contact";
  },[])

  return (
    <div>Contact</div>
  )
}

export default Contact