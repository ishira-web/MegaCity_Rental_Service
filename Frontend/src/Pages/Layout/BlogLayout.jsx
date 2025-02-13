import React from 'react'
import Navbar from '../Navbar'
import Blog from '../Blog'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

function BlogLayout() {
  return (
    <div className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar/>
        <Blog/>
        <Footer/>
        <Outlet/>
    </div>
  )
}

export default BlogLayout