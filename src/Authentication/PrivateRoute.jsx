import { Navigate } from "react-router-dom"

export function LandingRoute({children}) {
    const accessToken = localStorage.getItem("accessToken")
    return !accessToken ? children : <Navigate to={'/home'}/>
}

export function PrivateRoute({children}) {
  const accessToken = localStorage.getItem("accessToken")
  return accessToken ? children : <Navigate to={'/login'} />
}