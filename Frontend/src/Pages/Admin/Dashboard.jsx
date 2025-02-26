import React from 'react'
import { Ban } from 'lucide-react';

function Dashboard() {
  return (
    <div className="flex flex-col gap-10 bg-white min-h-[91vh]" p-6>

      {/* Upper Cards */}
     <div className='flex justify-center gap-10'>
     <div className='w-[20vw] h-[6vw] flex justify-center items-center border hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
      <div className='justify-center flex flex-col items-center gap-5'>
        <h1 className='font-semibold '>Booking Trips</h1>
        <h1 className='text-2xl font-bold text-purple-400'>120</h1>
      </div>
     </div>
     <div className='w-[20vw] h-[6vw] flex justify-center items-center border hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
        <div className='justify-center flex flex-col items-center gap-5'>
        <div className='flex flex-row gap-5'><Ban className='text-red-500' /><h1 className='font-semibold'>Cancel Bookings</h1></div>
        <h1 className='text-2xl font-bold text-red-400'>120</h1>
        </div>
     </div>  
     <div className='w-[20vw] h-[6vw] flex justify-center items-center border hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
      <div className='justify-center flex flex-col items-center gap-5'>
        <h1 className='font-semibold'>New Users</h1>
        <h1 className='text-2xl font-bold text-yellow-600'>120</h1>
      </div>
     </div>  
     <div className='w-[20vw] h-[6vw] flex justify-center items-center border hover:bg-black hover:text-yellow-50 rounded-md transition shadow-md'>
      <div className='justify-center flex flex-col items-center gap-5'>
        <h1 className='font-semibold'>New Drivers</h1>
        <h1 className='text-2xl font-bold text-rose-700'>120</h1>
      </div>
     </div>
     </div>
    
    <div className='border w-[25vw] h-[30vw] ml-3'>
     <div className='flex justify-center p-2'>
      <h1 className='font-walsheim font-semibold'>New Drivers</h1>
      </div>
      <div className='flex flex-row justify-between gap-5 px-3 py-3 border-t border-b  '>
        <img src={Ban} alt="pic" className='w-6 h-6 rounded-full' />
        <h1>Ishira Pahasara</h1>
        <div className='flex flex-row gap-2'>
        <button className='bg-green-600 text-white px-1 py-1 rounded-md'>Accept</button>
        <button className='bg-red-600 text-white px-1 py-1 rounded-md'>Decline</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard