import React from 'react'
import {Link} from 'react-router-dom'

const NoneFound = () => {
  return (
    <div>
      <h3>404 Page Not Found!</h3>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default NoneFound
