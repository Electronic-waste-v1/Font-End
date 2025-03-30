import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice"

interface ProtectedRouteProps {
  redirectPath?: string
}

export default function ProtectedRoute({ redirectPath = "/login" }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

