import React from 'react'
import NavbarUser from '../NavbarUser'
import Ride from '../Ride'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer.jsx";

function BookingLayout() {
  return (
    <div>
        <NavbarUser/>
        <Ride/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default BookingLayout