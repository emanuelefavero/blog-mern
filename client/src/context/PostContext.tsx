import { useState, createContext } from 'react'
import axios from 'axios'

// ---------- CONTEXT ----------
const PostContext = createContext({
  posts: [] as any,
  getPosts: () => {},
})

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/api/posts',
    }).then((res) => {
      setPosts(res.data.posts)
      // console.log(res.data.posts)
    })
  }

  // -------- RETURN --------
  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
