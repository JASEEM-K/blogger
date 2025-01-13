import {
  RiAddFill,
  RiMoonFill,
  RiSunLine,
  RiUser3Line,
  RiUserFill,
} from '@remixicon/react'
import { } from 'react'
import { useTheme } from './theme-provider'

export const Navbar = () => {

  const { setTheme, theme } = useTheme()

  return (
    <div className=' flex items-center justify-between px-4 h-12 shadow mb-4'>

      <div className='font-bold text-blue-500 cursor-pointer text-xl'>
        <h1 className=''>Blogger</h1>
      </div>

      <div className='flex items-center gap-2'>
        <RiAddFill className='text-secondary border-2 border-transparent bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-transparent hover:border-blue-500 duration-200 cursor-pointer' />

        {theme === "dark" ?
          <RiSunLine
            onClick={() => setTheme("light")}
            className='text-blue-500 hover:rotate-45  duration-200 cursor-pointer' />
          :

          <RiMoonFill
            onClick={() => setTheme("dark")}
            className='text-blue-500 hover:-rotate-90  duration-200 cursor-pointer' />
        }

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
