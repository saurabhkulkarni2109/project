import React from 'react'
import {Link} from 'react-router-dom'
const Admin = () => {
  return (
    <section>
        <h2>Welcome to admin panel</h2>
        <hr/>
        <Link to={"/add-room"}>Manage Rooms</Link>
    </section>
  )
}

export default Admin