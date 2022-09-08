import React from 'react'
import {Link} from 'react-router-dom'

function Verify() {
  return (
    <div>
    <h1>Successful email verification. You can sign in now</h1>
    <Link to='/'>Sign in</Link>
    </div>
  )
}

export default Verify