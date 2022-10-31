import { useNavigate, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Login() {
  const {
    user,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    login,
    getUser,
  } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user?.username) {
    return <Navigate to='/' replace />
  } else {
    return (
      <>
        <div>
          <h1>Login</h1>
          <input
            type='text'
            placeholder='Username'
            onChange={(e) => setLoginUsername(e.target.value)}
            value={loginUsername}
          />
          <input
            type='password'
            placeholder='Password'
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
          />
          <button
            onClick={async () => {
              await login()
              navigate('/')
            }}
          >
            Login
          </button>
        </div>
      </>
    )
  }
}

export default Login
