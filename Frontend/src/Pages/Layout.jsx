import React from 'react'
import Hero from '../Pages/Hero'
import Navbar from '../Pages/Navbar'
import HeroSub from '../Pages/HeroSub'
import Service from '../Pages/Service'
import Safety from '../Pages/Safety'
import Footer from '../Pages/Footer'
import { Outlet } from 'react-router-dom'
import Faq from '../Pages/Faq'

function Layout() {
  return (
    <div className='overflow-hidden'>
        
        <Navbar/>
         <Hero/>
         <HeroSub/>
         <Service/>
         <Safety/>
         <Faq/>
         <Footer/>
         <Outlet/>

    </div>
  )
}

export default Layout