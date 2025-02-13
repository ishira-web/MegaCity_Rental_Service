import React from 'react'
import Navbar from '../Navbar'
import Aboutus from '../Aboutus'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import AboutPage2 from '../../AboutPage2'
import BannerServices from '../BannerServices'

function AboutLayout() {
  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar/>
        <Aboutus/>
        <BannerServices/>
        <AboutPage2/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default AboutLayout