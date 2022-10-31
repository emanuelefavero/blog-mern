import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostContext from '../context/PostContext'

function Home() {
  const { id }: any = useParams()
  const { post, getPost } = useContext(PostContext)

  useEffect(() => {
    getPost(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: POST /posts/:id/comments createComment
  // TODO: GET /posts/:id/comments getComment

  return (
    <>
      <div>
        {post ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home
