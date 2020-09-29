import React from 'react'
import {Link} from 'react-router-dom'

function Confirmation() {
  return (
    <div>
      <div>
        <h2>Thanks for your Order</h2>
      </div>
      <div>
        <h4> Your Order number is : 123456</h4>
      </div>
      <div>
        <Link to="/home"> Return to Home</Link>
      </div>
    </div>
  )
}

export default Confirmation
