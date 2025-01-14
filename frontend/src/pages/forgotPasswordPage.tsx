import { validateResetForm } from "@/lib/formValidation"
import { useUserStore } from "@/sotres/user.store"
import { RiArrowLeftLine, RiFingerprint2Line, RiMailLine } from "@remixicon/react"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router"


export const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  })
  const { sendResetPassword, isSendingCode } = useUserStore()

  const handleSubmition = (e: FormEvent) => {
    e.preventDefault()
    if (validateResetForm(formData)) sendResetPassword(formData)
    toast.success("Reset Mail Send \r\nPlease check you mail box")
    // cloud make a local flag which when true show different page like view
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
        Forgot Password?
      </h1>
      <p className="mb-8">
        No worries, We&apos;ll send you reset mail
      </p>

      <form
        method="POST"
        onSubmit={(e) => handleSubmition(e)}
        className='space-y-5'
      >

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

        <button
          type="submit"
          disabled={isSendingCode}
          className="border rounded-sm w-full h-10 bg-blue-500 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 "
        >
          Send Mail
        </button>

      </form>

      <Link
        to="/login"
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
