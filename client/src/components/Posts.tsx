import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext'

function Home() {
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        {posts.map((post: any) => (
          <div key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
