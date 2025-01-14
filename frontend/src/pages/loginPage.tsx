import { validateLoginForm } from '@/lib/formValidation'
import { useUserStore } from '@/sotres/user.store'
import { RiEyeCloseLine, RiEyeLine, RiKeyLine, RiUser3Line } from '@remixicon/react'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router'


export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState('password')
  const { login, isLogining } = useUserStore()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateLoginForm(formData)) login(formData)
  }

  const toggleShowPassword = () => {
    if (showPassword === 'password') {
      setShowPassword('text')
    } else {
      setShowPassword('password')
    }
  }

  return (
    <div className='flex flex-col font-semibold items-center mt-8'>

      <h1
        className='sm:text-5xl text-3xl font-bold mb-5'
      >
        Welcome Back
      </h1>

      <form
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
        className='space-y-4'
      >

        <div>
          <label>
            <p>Username:</p>
          </label>
          <div
            className='flex gap-1 h-10 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
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
            className='flex gap-1 h-10 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
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

        <div className="w-full h-12 flex justify-center mt-8">
          <button
            disabled={isLogining}
            className="p-1 px-1.5 max-h-11 hover:font-semibold rounded-md border border-slate-500 hover:border-2 hover:text-blue-500 hover:border-blue-500 hover:shadow-blue-500/50 shadow-[4px_3px_0_0_rbg(0,0,0,1)]  duration-200 hover:scale-105 "
            type="submit"
          >
            Login
          </button >
        </div>

      </form >

      <p className='mt-2'>Don&apos;t have a&nbsp;
        <Link
          className='text-blue-500 hover:underline'
          to='/register'
        >account</Link></p>

      <Link
        className='text-blue-500 hover:underline'
        to='/forgot'
      >Forgot Password</Link>

    </div >
  )
}
