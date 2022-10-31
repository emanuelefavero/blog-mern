import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Header() {
  const { user, logout } = useContext(UserContext)

  useEffect(() => {
    // getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header>
        <Link to='/'>Home</Link>

        {user?.username ? (
          <>
            <button
              onClick={() => {
                logout()
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </header>
    </>
  )
}

export default Header
