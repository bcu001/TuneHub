import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/button'

const NotFound = () => {
  return (
    <div>
      ERROR 404 page not found
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  )
}

export default NotFound
