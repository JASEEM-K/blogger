import { RiEyeCloseLine, RiEyeLine, RiKeyLine, RiUser3Line } from '@remixicon/react'
import { useState } from 'react'


export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState('password')

  const handleSubmit = () => {
  }

  const toggleShowPassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  return (
    <div>

      <form
        method='POST'
        onSubmit={handleSubmit}
      >

        <div>
          <label>
            <p>Username:</p>
          </label>
          <div
            className='flex gap-1 h-8 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
          >
            <RiUser3Line />
            <input
              type='text'
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              value={formData.username}
              placeholder='Jesse'
              className='pl-1 outline-none bg-transparent w-full'
            />
          </div>
        </div>

        <div>
          <label>
            <p>Password:</p>
          </label>
          <div
            className='flex gap-1 h-8 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
          >
            <RiKeyLine />
            <input
              type={showPassword}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
              placeholder='******'
              className='pl-1 outline-none bg-transparent w-full'
            />
            <button
              type='button'
              onClick={toggleShowPassword}
            >
              {
                showPassword === 'password' ?
                  <RiEyeCloseLine /> :
                  <RiEyeLine />
              }
            </button>
          </div>
        </div>

        <div className="w-full h-10 flex justify-center mt-5">
          <button
            //disabled={isLogingIn}
            className="p-1 px-1.5 rounded-md border border-slate-500 hover:border-2 hover:text-blue-500 hover:border-blue-500 hover:shadow-blue-200 shadow-[4px_3px_0_0_rbg(0,0,0,1)]  duration-200 hover:scale-105 "
            type="submit"
          >
            Login
          </button >
        </div>

      </form >

      <p>Already have an&nbsp;
        <a href='/register'
        >account</a></p>

      <a href='/forgot'
      >Forgot Password</a>

    </div >
  )
}
