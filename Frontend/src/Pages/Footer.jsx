import React from 'react'
import Logo from '../assets/LogoFooter.svg'
import Payment from '../assets/pay.svg'
import { LocateIcon, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='min-h-screen bg-blue-600 font-simplon px-5'>
      <div className='flex flex-col border-b-2 '>
        <img src={Logo} alt="Logo" />
      </div>
      <div className='flex flex-row gap-10 items-center justify-between text-xl p-10 text-white border-b-2 '>
        <div className='w-[20vw]  text-balance '>
            <p>MegaCity offers reliable, affordable, and safe transportation solutions tailored to your needs.<br />Whether it’s a quick ride across town or a long-distance journey.</p>
        </div>
      <div>
        <ul>
            <li><Link>Home</Link></li>
            <li><Link to="/ride">Ride</Link></li>
            <li>About Us</li>
            <li>Safty</li>
        </ul>
      </div>
      <div className='mb-10'>
        <ul>
            <li><Link to='/blog'>Blog</Link></li>
            <li><Link to='/'>Contact Us</Link></li>
           <Link to='driver-register'><li>Join as a Driver</li></Link> 
        </ul>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <ul className='flex flex-col gap-5'>
            <li className='flex gap-2'><Phone/>0743631212</li>
            <li className='flex gap-2'><Mail/>info@megacab.com</li>
            <li className='flex gap-2'><LocateIcon/>No23 Colombo 2,Srilanka</li>
        </ul>
      </div>
      </div>
    <div className='flex flex-row font-simplon justify-between items-center  gap-5 p-10 text-white'>
      <p >© MegaCity. All rights reserved.</p>
      <img src={Payment} alt="" className='w-[15vw] px-5' />
    </div>
    </div>
  )
}

export default Footer