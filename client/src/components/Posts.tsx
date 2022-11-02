import styles from './Posts.module.css'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import PostContext from '../context/PostContext'

function Home() {
  const { posts, getPosts } = useContext(PostContext)

  useEffect(() => {
    getPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.Posts}>
        {posts.map((post: any) => (
          <div key={post._id}>
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/posts/${post._id}`}
            >
              <h2>{post.title}</h2>
            </Link>
            {/* <p>{post.content}</p> */}

            {/* NOTE: MARKDOWN RENDER */}
            {/* <p>{post.content}</p> */}
            <ReactMarkdown
              className={styles.markdownContainer}
              children={post.content}
            />

            <hr />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
