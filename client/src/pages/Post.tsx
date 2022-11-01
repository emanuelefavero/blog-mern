import { useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const { id }: any = useParams()
  const { user, getUser } = useContext(UserContext)
  const {
    post,
    getPost,
    deletePost,
    updatePost,
    showUpdateForm,
    setShowUpdateForm,
    postTitle,
    setPostTitle,
    postContent,
    setPostContent,
  } = useContext(PostContext)
  const {
    comments,
    getComments,
    commentContent,
    setCommentContent,
    createComment,
    deleteComment,
  } = useContext(CommentContext)

  useEffect(() => {
    getUser()
    getPost(id)

    setShowUpdateForm(false)

    getComments(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (post.title) {
      setPostTitle(post.title)
    }

    if (post.content) {
      setPostContent(post.content)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUpdateForm])

  return (
    <>
      <div>
        {/* POST */}
        {post ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            {/* DELETE POST */}
            {user && user.role === 'admin' && (
              <button
                onClick={() => {
                  deletePost(post._id)
                  navigate('/')
                }}
              >
                Delete Post
              </button>
            )}

            {/* UPDATE POST */}
            {user && user.role === 'admin' && (
              <>
                <button
                  onClick={() => {
                    setShowUpdateForm(!showUpdateForm)
                  }}
                >
                  {showUpdateForm ? 'Cancel' : 'Edit Post'}
                </button>

                {/* Update Form */}
                {showUpdateForm && (
                  <>
                    <input
                      type='text'
                      placeholder='Title'
                      value={postTitle}
                      onChange={(e) => {
                        setPostTitle(e.target.value)
                        // checkPostTitle(e)
                      }}
                      required
                    />
                    <input
                      type='text'
                      placeholder='Content'
                      value={postContent}
                      onChange={(e) => {
                        setPostContent(e.target.value)
                        // checkPostContent(e)
                      }}
                      required
                    />
                    <button
                      onClick={() => {
                        updatePost(post._id)
                        setShowUpdateForm(false)
                        window.location.reload()
                      }}
                    >
                      Update Post
                    </button>
                  </>
                )}
              </>
            )}

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

                {/* DELETE COMMENT */}
                {user && user.role === 'admin' && (
                  <button
                    onClick={() => {
                      deleteComment(id, comment._id)
                      window.location.reload()
                    }}
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home
