import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
      <div>
        {user ? (
          <>
            <h1>Welcome back, {user.username}</h1>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home
