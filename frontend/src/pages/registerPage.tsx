import { RiEyeCloseLine, RiEyeLine, RiKeyLine, RiMailLine, RiUser3Line } from '@remixicon/react'
import { useState } from 'react'


export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState('password')
  const [showConfirmPassword, setShowConfirmPassword] = useState('password')

  const handleSubmit = () => {
  }

  const toggleShowPassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  const toggleShowConfirmPassword = () => {
    if (showConfirmPassword === 'password') {
      setShowConfirmPassword('text')
    } else {
      setShowConfirmPassword('password')
    }
  }

  return (
    <div className='flex flex-col items-center'>

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
            <p>Email:</p>
          </label>
          <div
            className='flex gap-1 h-8 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
          >
            <RiMailLine />
            <input
              type='email'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
              placeholder='jesse123@gmai.com'
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

        <div>
          <label>
            <p>Confirm Password:</p>
          </label>
          <div
            className='flex gap-1 h-8 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
          >
            <RiKeyLine />
            <input
              type={showConfirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              value={formData.confirmPassword}
              placeholder='******'
              className='pl-1 outline-none bg-transparent w-full'
            />
            <button
              type='button'
              onClick={toggleShowConfirmPassword}
            >
              {
                showConfirmPassword === 'password' ?
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
            Register
          </button >
        </div>

      </form >

      <p>Already have an&nbsp;
        <a href='/login'
        >account</a></p>

    </div >
  )
}
