import { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import PostContext from '../context/PostContext'
import CommentContext from '../context/CommentContext'

interface CommentInterface {
  _id: string
  content: string
  createdAt: Date | string
  userId: {
    _id: string
    username: string
  }
}

function Home() {
  const { id }: any = useParams()
  const { user, getUser } = useContext(UserContext)
  const { post, getPost } = useContext(PostContext)
  const {
    comments,
    getComments,
    commentContent,
    setCommentContent,
    createComment,
  } = useContext(CommentContext)

  useEffect(() => {
    getUser()
    getPost(id)

    getComments(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        {/* POST */}
        {post ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            {/* CREATE COMMENT */}
            {user ? (
              <>
                <input
                  type='text'
                  placeholder='Add a comment...'
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                />
                <button
                  onClick={() => {
                    createComment(id)
                    window.location.reload()
                  }}
                >
                  Comment
                </button>
              </>
            ) : comments.length > 0 ? (
              <Link to='/login'>Login to join the conversation</Link>
            ) : (
              <Link to='/login'>Login and be the first to comment</Link>
            )}

            {/* COMMENTS */}
            {comments.length > 0 && <h2>Comments</h2>}
            {comments.map((comment: CommentInterface) => (
              <div key={comment._id}>
                {/* escape single quotes from comment.content using regex */}
                <h3>{comment.userId?.username && comment.userId.username}</h3>
                <p>{comment.content}</p>
                {/* <p>{comment.content}</p> */}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home