import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import Posts from '../components/Posts'

function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
      <div>
        {user ? (
          <>
            <h1>Welcome back, {user.username}</h1>

            {user.role === 'admin' && (
              <Link to='/posts/create-post'>Create New Post</Link>
            )}
          </>
        ) : null}
      </div>

      <Posts />
    </>
  )
}

export default Home
