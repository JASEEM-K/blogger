import { useUserStore } from "@/sotres/user.store"
import { RiVerifiedBadgeLine } from "@remixicon/react"
import { useEffect } from "react"
import { Link, useParams } from "react-router"


export const VerifyEmailPage = () => {
  const { verifyEmail, isVerifyingEmail } = useUserStore()
  const { code } = useParams()

  useEffect(() => {
    verifyEmail(code || "")
  }, [])

  if (isVerifyingEmail) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div className='flex flex-col font-semibold items-center mt-20'>

      <div className="border-2 border-primary/50 p-2 rounded-md">
        <RiVerifiedBadgeLine
          className=""
        />
      </div>

      <h1 className="text-3xl font-bold mt-5">
        All Done!
      </h1>

      <p className="mt-4">
        You&apos;r email verification is tone.
      </p>

      <p>
        Go to home page
      </p>

      <Link
        to="/"
        className="mt-12 border-2 w-40 h-10 flex justify-center items-center border-blue-500 cursor-pointer rounded-md text-blue-500 hover:bg-blue-500 hover:text-secondary duration-200 "
      >
        Get started
      </Link>

    </div>
  )
}
