import React from 'react'
import { CgMoreVertical } from "react-icons/cg";
import { CgBell } from "react-icons/cg";
import { CgMathPlus } from "react-icons/cg"
import profileImage from "../../assests/image.png"



function Navbar() {
  return (
    <nav className='bg-[#1F2229] h-20 w-full p-2 flex items-center justify-end cursor-pointer group relative' >
      <div className='mr-3 w-8 h-8 flex justify-center items-center border-2 border-white rounded-lg '>
        <CgMathPlus
        className='text-2xl font-semibold text-slate-300'
        />
      </div>
        <div className='relative'>
            <div className='w-5 h-5 text-center text-sm rounded-full bg-red-500 text-white
            absolute bottom-4 right-2
            '>2</div>
        <CgBell  className='text-3xl mr-6 text-slate-300'/>
        </div>
      <div className='w-52 h-full border-neutral-700 border-2 rounded-xl p-1 flex items-center '>
        <div className='mr-2'>
            <div className='text-lg font-semibold w-28 text-slate-300'>Admin</div>
            <div className='text-[12px] text-primary-color'>My setting</div>
        </div>
        <div className='border-2 border-black rounded-xl w-12 h-full'>
        <img src={profileImage} alt='Logo' className='rounded-lg w-12 h-12 object-fill' /> 
        </div>
      <CgMoreVertical  className='text-2xl ml-1 text-white'/>
      </div>
      <div className='border absolute top-20 right-10 p-2 text-white rounded-xl opacity-0 group-hover:opacity-100 
      duration-300 transition-all 
      '>Navbar not functional</div>
    </nav>
  )
}

export default Navbar
