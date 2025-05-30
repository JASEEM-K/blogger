import {
  RiAddFill,
  RiLogoutBoxLine,
  RiMoonFill,
  RiSunLine,
  RiUser3Line,
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
          to="/"
        >
          <h1 className='hover:animate-pulse '>Blogger</h1>
        </Link>
      </div>

      <div className='flex items-center gap-4  '>
        <Link
          to="/create"
        >
          <RiAddFill
            className='text-secondary border-2 border-transparent bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-transparent hover:border-blue-500 duration-200 cursor-pointer hover:scale-125 '
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

            <div
              className=' size-6 rounded-full transform overflow-hidden  transition-all hover:'
            >
              <img className='h-full w-full object-cover' src={authUser?.profilePic || "/placeholder.png"} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='border-2 px-4 mt-4 mr-3 rounded-md gap-2 flex flex-col font-semibold space-y-1 py-1 pb-3 w-52 bg-secondary '
          >

            <Link
              className='flex mt-4 justify-center gap-2 items-center rounded-md h-8 w-full hover:bg-blue-500/20 hover:border-primary/40 disabled:cursor-not-allowed  '
              to={`/user/${authUser?.username}`}
            >
              <RiUser3Line
                className='size-5 '
              />
              Your Profile
            </Link>

            <button
              className='flex mt-4 justify-center gap-2 items-center rounded-md h-8 w-full hover:bg-blue-500/20 hover:border-primary/40 disabled:cursor-not-allowed  '
              disabled={isLoginout}
              onClick={logout}
            >
              <RiLogoutBoxLine
                className='size-5 -scale-x-100 '
              />
              Sign out
            </button>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>
  )
}
