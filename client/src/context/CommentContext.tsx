import { useState, createContext } from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

// Create react context for comments of each post
const CommentContext = createContext({
  comments: [] as any,
  getComments: (id: string) => {},
  commentContent: '',
  setCommentContent: (content: string) => {},
  createComment: (id: string) => {},
  deleteComment: (id: string, commentId: string) => {},
})

export function CommentProvider({ children }: { children: React.ReactNode }) {
  // GET comments
  const [comments, setComments] = useState([])
  const getComments = async (id: any) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/posts/${id}/comments`,
    }).then((res) => {
      setComments(res.data.comments)
      // console.log(res.data)
    })
  }

  // Create comment
  const [commentContent, setCommentContent] = useState('')
  const createComment = async (id: string) => {
    await axios({
      method: 'POST',
      withCredentials: true,
      data: {
        content: commentContent,
      },
      url: `/api/posts/${id}/comments/`,
    }).then((res) => {
      console.log(res)
    })
  }

  // Delete comment
  const deleteComment = async (id: string, commentId: string) => {
    await axios({
      method: 'DELETE',
      withCredentials: true,
      url: `/api/posts/${id}/comments/${commentId}`,
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        getComments,
        commentContent,
        setCommentContent,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export default CommentContext
