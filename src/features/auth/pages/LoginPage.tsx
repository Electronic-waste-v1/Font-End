"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Recycle } from "lucide-react"
import { Button } from "../../../shared/components/ui/button"
import { AuthForm, type FormFields } from "../components/AuthForm"
import { useLoginMutation } from "../services/authApi"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectAuthError, selectIsAuthenticated, setCredentials, setError } from "../slices/authSlice"

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const authError = useAppSelector(selectAuthError)

  const [login, { isLoading, error }] = useLoginMutation()

  useEffect(() => {
   
    if (isAuthenticated) {
      navigate("/dashboard/recycling")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (formData: FormFields) => {
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap()

      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
        }),
      )

    
      navigate("/dashboard")
    } catch (err) {
      
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err.data as { message?: string }
        dispatch(setError(errorData.message || "Login failed. Please try again."))
      } else {
        dispatch(setError("Login failed. Please try again."))
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gray-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl">
    
        <div className="w-full md:w-1/2 relative bg-emerald-900 text-white">
          <div className="absolute top-6 left-6">
            <Link to="/" className="flex items-center gap-2">
              <Recycle className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">EcoRecycle</span>
            </Link>
          </div>

          <Link
            to="/"
            className="absolute top-6 right-6 text-white bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="h-full flex flex-col">
            <img
              src="/placeholder.svg?height=800&width=600"
              alt="Nature scene"
              className="w-full h-full object-cover opacity-50"
            />

            <div className="absolute bottom-12 left-0 right-0 text-center px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Recycling E-Waste,</h2>
              <h2 className="text-3xl md:text-4xl font-bold">Preserving Our Future</h2>

              <div className="flex justify-center mt-8 gap-2">
                <div className="w-8 h-1 rounded-full bg-gray-400"></div>
                <div className="w-8 h-1 rounded-full bg-white"></div>
                <div className="w-8 h-1 rounded-full bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-900 text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-6">Log in</h1>

            <p className="mb-8 text-gray-300">
              Don't have an account?{" "}
              <Link to="/register" className="text-emerald-400 hover:underline">
                Create an account
              </Link>
            </p>

            <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} error={authError} />

            <div className="mt-8 relative flex items-center justify-center">
              <hr className="w-full border-gray-700" />
              <span className="absolute bg-gray-900 px-4 text-sm text-gray-400">Or log in with</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" className="mr-2">
                  <path
                    fill="white"
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

