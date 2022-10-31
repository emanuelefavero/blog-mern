import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import PostContext from '../context/PostContext'

function Home() {
  const { user } = useContext(UserContext)
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        {user ? (
          <>
            <h1>Welcome back, {user.username}</h1>
          </>
        ) : null}
      </div>

      <div>
        {posts.map((post: any) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
