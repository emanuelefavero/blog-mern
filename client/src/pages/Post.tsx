import styles from './Post.module.css'
import classnames from 'classnames'
import randomColor from 'randomcolor'
import { useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
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
    <div className={styles.Post}>
      {/* POST */}
      {post ? (
        <>
          {/* <h1>{post.title}</h1> */}
          <h1>{showUpdateForm ? postTitle : post.title}</h1>

          {/* NOTE: MARKDOWN RENDER */}
          {/* <p>{post.content}</p> */}
          <ReactMarkdown
            className={styles.markdownContainer}
            // children={post.content}
            children={showUpdateForm ? postContent : post.content}
          />

          {/* DELETE POST */}
          {user && user.role === 'admin' && (
            <button
              className={classnames(styles.deleteButton, styles.adminFeature)}
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
                className={classnames(styles.editButton, styles.adminFeature)}
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
                  <textarea
                    placeholder='Post Content (Markdown)'
                    value={postContent}
                    onChange={(e) => {
                      setPostContent(e.target.value)
                      // checkPostContent(e)
                    }}
                    required
                  />
                  <button
                    className={classnames(
                      styles.updateButton,
                      styles.adminFeature
                    )}
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

          <section className={styles.comments}>
            {/* CREATE COMMENT */}
            {user ? (
              <>
                <textarea
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

            <hr />

            {/* COMMENTS */}
            {comments.length > 0 && <h2>Comments</h2>}
            {comments.map((comment: CommentInterface) => (
              <div key={comment._id}>
                {/* escape single quotes from comment.content using regex */}
                <h3
                  style={{
                    color: randomColor({
                      luminosity: 'light',
                      hue: 'purple',
                    }),
                  }}
                >
                  {comment.userId?.username && comment.userId.username}
                  {/* DELETE COMMENT */}
                  {user && user.role === 'admin' && (
                    <button
                      className={classnames(
                        styles.deleteButton,
                        styles.adminFeature
                      )}
                      onClick={() => {
                        deleteComment(id, comment._id)
                        window.location.reload()
                      }}
                    >
                      Delete Comment
                    </button>
                  )}
                </h3>
                <p>{comment.content}</p>
                {/* <p>{comment.content}</p> */}
              </div>
            ))}
          </section>
        </>
      ) : null}
    </div>
  )
}

export default Home
