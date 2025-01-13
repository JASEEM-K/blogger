import { validateRegisterForm } from '@/lib/formValidation'
import { useUserStore } from '@/sotres/user.store'
import { RiEyeCloseLine, RiEyeLine, RiKeyLine, RiMailLine, RiUser3Line } from '@remixicon/react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'


export const RegisterPage = () => {
  const { register, isRegistering } = useUserStore()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState('password')
  const [showConfirmPassword, setShowConfirmPassword] = useState('password')


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    validateRegisterForm(formData)
    register(formData)
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
    <div className='flex flex-col font-semibold items-center'>

      <h1
        className='sm:text-4xl text-3xl font-bold mb-5'
      >
        Create a Account
      </h1>

      <form
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
        className='space-y-3'
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
            <p>Email:</p>
          </label>
          <div
            className='flex gap-1 h-10 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
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

        <div>
          <label>
            <p>Confirm Password:</p>
          </label>
          <div
            className='flex gap-1 h-10 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
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

        <div className="w-full h-14 flex justify-center pt-2">
          <button
            disabled={isRegistering}
            className="p-1 px-1.5 max-h-11 hover:font-semibold rounded-md border border-slate-500 hover:border-2 hover:text-blue-500 hover:border-blue-500 hover:shadow-blue-500/50 shadow-[4px_3px_0_0_rbg(0,0,0,1)]  duration-200 hover:scale-105 "
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </button >
        </div>

      </form >

      <p className='mt-2'>Already have an&nbsp;
        <a className='text-blue-500 hover:underline' href='/login'
        >account</a></p>

    </div >
  )
}
