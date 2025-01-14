import { validateResetPasswordFrom } from "@/lib/formValidation"
import { useUserStore } from "@/sotres/user.store"
import { RiArrowLeftLine, RiEyeCloseLine, RiEyeLine, RiFingerprint2Line, RiKeyLine, } from "@remixicon/react"
import { FormEvent, useState } from "react"
import { Link, useParams } from "react-router"


export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState('password')
  const [showConfirmPassword, setShowConfirmPassword] = useState('password')
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const { resetPassword, isResetingPassword } = useUserStore()
  const { code } = useParams()

  const handleSubmition = (e: FormEvent) => {
    e.preventDefault()
    if (validateResetPasswordFrom(formData)) resetPassword(code
      || "", formData)
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
    <div className='flex flex-col font-semibold items-center mt-8'>

      <div
        className=" p-2 border border-primary/50 rounded-md mb-4"
      >
        <RiFingerprint2Line
        />
      </div>

      <h1
        className='sm:text-4xl text-3xl font-bold mb-4'
      >
        Set new password
      </h1>
      <p className="mb-8">
        Must be atleast 6 characters
      </p>

      <form
        method="POST"
        onSubmit={(e) => handleSubmition(e)}
        className='space-y-3'
      >

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

        <button
          type="submit"
          disabled={isResetingPassword}
          className="border rounded-sm w-full h-10 bg-blue-500 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 "
        >
          Reset Password
        </button>

      </form>

      <Link to="/login"
        className="flex items-center gap-1 mt-4 text-blue-500 hover:underline"
      >
        <RiArrowLeftLine
          className="translate-y-0.5"
        />
        <p> Back to login</p>
      </Link>

    </div >
  )
}
