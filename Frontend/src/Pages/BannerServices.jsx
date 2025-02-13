import React from 'react'
import Tripadvisor from '/public/images/trip-advisor.svg'
import Google from '/public/images/google-review.svg'

function BannerServices() {
  return (
    <div className='flex flex-row justify-center font-walsheim border items-center gap-48 min-h-[9vw] '>
      <div className='flex flex-row gap-12 justify-center items-center'>
       <img src={Tripadvisor} alt="" />
    <div className='flex flex-row gap-5'>
        <h1 className='font-bold font-sans text-5xl'>4.0/<span className='text-2xl'>5</span></h1>
        <div>
        <h1>Recommended</h1>
        <h1>580+ reviews</h1>
        </div>
    </div>
      </div>
      <div className='flex flex-row justify-center items-center gap-12'>
      <img src={Google} alt="" />
      <div className='flex flex-row gap-5'>
        <h1 className='font-bold font-sans text-5xl'>4.8/<span className='text-2xl'>5</span></h1>
        <div>
        <h1>Recommended</h1>
        <h1>1200+ reviews</h1>
        </div>
    </div>
      </div>
    </div>
  )
}

export default BannerServices