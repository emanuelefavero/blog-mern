import { useState, createContext } from 'react'
import axios from 'axios'

// ---------- CONTEXT ----------
const PostContext = createContext({
  posts: [] as any,
  getPosts: () => {},
  post: {} as any,
  getPost: (id: string) => {},
  postTitle: '',
  setPostTitle: (title: string) => {},
  postContent: '',
  setPostContent: (content: string) => {},
  createPost: () => {},
  deletePost: (id: string) => {},
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

  // GET post
  const [post, setPost] = useState({})
  const getPost = async (id: any) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `http://localhost:4000/api/posts/${id}`,
    }).then((res) => {
      setPost(res.data.post)
      // console.log(res.data.post)
    })
  }

  // Create post
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const createPost = async () => {
    await axios({
      method: 'POST',
      withCredentials: true,
      data: {
        title: postTitle,
        content: postContent,
      },
      url: 'http://localhost:4000/api/posts/create-post',
    }).then((res) => {
      console.log(res)
    })
  }

  // Delete post
  const deletePost = async (id: string) => {
    await axios({
      method: 'DELETE',
      withCredentials: true,
      url: `http://localhost:4000/api/posts/${id}`,
    }).then((res) => {
      console.log(res)
    })
  }

  // -------- RETURN --------
  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        post,
        getPost,
        postTitle,
        postContent,
        setPostTitle,
        setPostContent,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
