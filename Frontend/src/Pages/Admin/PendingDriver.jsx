import React from 'react'

function PendingDriver() {
  return (
   
<div className="grid grid-cols-5 grid-rows-5 gap-4 p-4">
    <div className=" col-span-5 bg-yellow-100  min-h-[7vw] flex items-center p-4 border-2 border-orange-300 rounded-xl">
        <div className='w-full flex flex-row justify-between items-center  '>
           <div> <img src="" alt="pictuer" className='w-20 h-20  border border-black rounded-full object-cover'/></div>
            <div><h1>You have New Driver Pending !</h1></div>
            <div className='flex flex-row gap-5'>
            <button className='bg-green-600 text-white px-3 py-2 rounded-lg '>Accept</button>
            <button className='bg-red-600 text-white px-3 py-2 rounded-lg '>Reject</button>
            </div>
        </div>
    </div>
    <div className="col-span-3 row-span-4 flex justify-between p-4 row-start-2 bg-slate-400">
        <div className='w-[15vw] h-[15vw] border object-cover'>
            <img src="" alt="photo" className='w-[15vw] h-[15vw]' />
        </div>
        <div  className='w-[30vw] h-[29vw] border object-cover'>
          <div><h1>Full Name</h1></div>
          <div><h1>Address</h1></div>
          <div><h1>Driver Email</h1></div>
          <div><h1>Phone Number</h1></div>
          
        </div>


    </div>
    <div className="col-span-2 row-span-4 col-start-4 row-start-2 bg-slate-300">3</div>
</div>
    
  )
}

export default PendingDriver