import React from 'react'
import NavbarUser from '../NavbarUser'
import Ride from '../Ride'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Ride2 from '../Ride2'
import BookingBanner from '../BookingBanner'
import BannerServices from '../BannerServices'
import BannerCount from '../Components/BannerCount'

function RideLayout() {
  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden'>
        <NavbarUser/>
        <Ride/>
        <Ride2/>
        <BannerServices/>
        <BookingBanner/>
        <BannerCount/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default RideLayout