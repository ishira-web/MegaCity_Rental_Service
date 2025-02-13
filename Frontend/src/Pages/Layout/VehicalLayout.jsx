import React from 'react'
import VehicalShow from '../VehicalShow'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import FareTable from '../FareTable'

function VehicalLayout() {
  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar/>
        <VehicalShow/>
        <FareTable/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default VehicalLayout