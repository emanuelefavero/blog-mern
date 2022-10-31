import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useContext } from 'react'
import UserContext from '../context/UserContext'

interface Props {
  children: ReactNode
  redirectPath?: string
}

function ProtectedRoute({ redirectPath = '/login', children }: Props) {
  const { user, getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
