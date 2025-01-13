import {
  RiAddFill,
  RiMoonFill,
  RiSunLine,
  RiUser3Line,
  RiUserFill,
} from '@remixicon/react'
import { } from 'react'

export const Navbar = () => {

  return (
    <div className=' flex items-center justify-between px-4 h-12 shadow mb-4'>

      <div className='font-bold text-blue-500 cursor-pointer text-xl'>
        <h1 className=''>Blogger</h1>
      </div>

      <div className='flex items-center gap-2'>
        <RiAddFill className='text-white border-2 border-white bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-white hover:border-blue-500 duration-200 cursor-pointer' />

        <RiSunLine className='text-blue-500 hover:rotate-45  duration-200 cursor-pointer' />

        <RiMoonFill className='text-blue-500 hover:-rotate-90  duration-200 cursor-pointer' />

        <div className='text-blue-500 group cursor-pointer  '>
          <RiUser3Line
            className=' group-hover:hidden transform transition-all ' />
          <RiUserFill
            className=' text-blue-400 hidden group-hover:block hover:scale-105 transform transition-all ' />
        </div>

      </div>

    </div>
  )
}
