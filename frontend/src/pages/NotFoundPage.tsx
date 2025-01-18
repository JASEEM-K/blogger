import { Link } from "react-router"



export const NotFoundPage = () => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center align-middle font-semibold"
    >

      <div className="">
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold  text-4xl">
            Opps!
          </p>
          <p className="font-bold text-2xl">
            404
          </p>
          <p>
            Page not found 😞, Go to home Page?
          </p>
          <Link
            to='/'
            className=" px-4 py-1 rounded-sm border-2 border-blue-500 text-blue-500 "
          >
            Home
          </Link>
          <div className="h-12">
          </div>
        </div>
      </div>

    </div>
  )
}
