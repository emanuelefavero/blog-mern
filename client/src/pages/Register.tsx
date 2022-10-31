import { useNavigate, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

function Register() {
  const {
    user,
    registerUsername,
    setRegisterUsername,
    registerPassword,
    setRegisterPassword,
    register,
    getUser,
  } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    getUser()
    // console.log(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user?.username) {
    return <Navigate to='/' replace />
  } else {
    return (
      <div>
        <h1>Register</h1>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setRegisterUsername(e.target.value)}
          value={registerUsername}
        />
        <input
          type='text'
          placeholder='Password'
          onChange={(e) => setRegisterPassword(e.target.value)}
          value={registerPassword}
        />
        <button
          onClick={() => {
            register()
            navigate('/')
          }}
        >
          Register
        </button>
      </div>
    )
  }
}

export default Register
