import {
  RiAddFill,
  RiLogoutBoxLine,
  RiMoonFill,
  RiSunLine,
  RiUser3Line,
  RiUserFill,
  RiVerifiedBadgeFill,
} from '@remixicon/react'
import { } from 'react'
import { useTheme } from './theme-provider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router'
import { useUserStore } from '@/sotres/user.store'

export const Navbar = () => {
  const { setTheme, theme } = useTheme()
  const { logout, isLoginout, authUser } = useUserStore()

  return (
    <div className=' flex items-center justify-between px-6 h-12 shadow bg-secondary '>

      <div className='font-bold text-blue-500 cursor-pointer text-xl'>
        <Link
          to="/home"
        >
          <h1 className=''>Blogger</h1>
        </Link>
      </div>

      <div className='flex items-center gap-4 '>
        <Link
          to="/create"
        >
          <RiAddFill
            className='text-secondary border-2 border-transparent bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-transparent hover:border-blue-500 duration-200 cursor-pointer'
          />
        </Link>

        {theme === "dark" ?
          <RiSunLine
            onClick={() => setTheme("light")}
            className='text-blue-500 hover:rotate-45  duration-300 cursor-pointer' />
          :

          <RiMoonFill
            onClick={() => setTheme("dark")}
            className='text-blue-500 hover:-rotate-90  duration-300 cursor-pointer' />
        }

        <DropdownMenu>
          <DropdownMenuTrigger className='outline-none' >

            <div className='text-blue-500 group cursor-pointer  '>
              <RiUser3Line
                className=' group-hover:hidden transform transition-all hover:-scale-x-100 ' />
              <RiUserFill
                className=' text-blue-400 hidden group-hover:block hover:-scale-x-100 transform transition-all ' />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='border-2 px-4 mt-4 mr-3 rounded-md flex flex-col font-semibold space-y-1 py-1 pb-3 w-52 bg-secondary '
          >

            <div className='flex gap-1 items-center'>
              <p>{authUser?.username}</p>
              {authUser?.verify === true && <RiVerifiedBadgeFill
                className='text-blue-500 size-5 translate-y-0.5'
              />}
            </div>
            <p
              className='pb-2 max-w-40 break-words'
            >{authUser?.email}
            </p>

            <button
              className='flex justify-center  bg-blue-500 rounded-md border-2 h-7 w-full border-blue-500 text-white hover:bg-transparent hover:text-blue-500 '
              disabled={isLoginout}
              onClick={logout}
            >
              <RiLogoutBoxLine
                className='size-5 translate-y-0.5'
              />
              Logout
            </button>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>
  )
}
