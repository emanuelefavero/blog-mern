import styles from './CreatePost.module.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import UserContext from '../context/UserContext'
import PostContext from '../context/PostContext'

function CreatePost() {
  const { user } = useContext(UserContext)
  const { postTitle, setPostTitle, postContent, setPostContent, createPost } =
    useContext(PostContext)

  const navigate = useNavigate()

  // NOTE: NEW POST VALIDATION
  const [isPostTitleValid, setIsPostTitleValid] = useState(false)
  const [isPostContentValid, setIsPostContentValid] = useState(false)

  const checkPostTitle = (e: any) => {
    if (e.target.value.length > 0) {
      setIsPostTitleValid(true)
    } else {
      setIsPostTitleValid(false)
    }
  }

  const checkPostContent = (e: any) => {
    if (e.target.value.length > 0) {
      setIsPostContentValid(true)
    } else {
      setIsPostContentValid(false)
    }
  }

  const handleSubmit = () => {
    if (isPostTitleValid && isPostContentValid) {
      createPost()
      navigate('/')
    } else {
      alert('Please fill out all fields')
    }
  }

  // RETURN
  return (
    <>
      <div className={styles.CreatePost}>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <div>
                <h2>Create new post</h2>
                <input
                  type='text'
                  placeholder='Title'
                  value={postTitle}
                  onChange={(e) => {
                    setPostTitle(e.target.value)
                    checkPostTitle(e)
                  }}
                  required
                />
                <textarea
                  placeholder='Post Content (Markdown)'
                  value={postContent}
                  onChange={(e) => {
                    setPostContent(e.target.value)
                    checkPostContent(e)
                  }}
                  required
                />
                <button
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  Create
                </button>
              </div>
            ) : null}
          </>
        ) : null}
        {postContent && (
          <h3 className={styles.markdownPreviewText}>Live Markdown Preview:</h3>
        )}
        {/* NOTE: MARKDOWN RENDER */}
        {/* <p>{post.content}</p> */}
        <ReactMarkdown
          className={styles.markdownContainer}
          children={postContent}
        />
      </div>
    </>
  )
}

export default CreatePost
