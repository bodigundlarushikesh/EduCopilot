import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()

  const token = localStorage.getItem('educopilotToken')

  // Allow public authentication pages
  const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ]

  // If current page is public, allow access
  if (publicPaths.includes(location.pathname)) {
    return children
  }

  // If user is not logged in, go to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // User is authenticated
  return children
}

export default ProtectedRoute