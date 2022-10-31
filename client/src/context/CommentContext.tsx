import { useState, createContext } from 'react'
import axios from 'axios'

// Create react context for comments of each post
const CommentContext = createContext({
  comments: [] as any,
  getComments: (id: string) => {},
  commentContent: '',
  setCommentContent: (content: string) => {},
  createComment: (id: string) => {},
})

export function CommentProvider({ children }: { children: React.ReactNode }) {
  // GET comments
  const [comments, setComments] = useState([])
  const getComments = async (id: any) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: `http://localhost:4000/api/posts/${id}/comments`,
    }).then((res) => {
      setComments(res.data.comments)
      // console.log(res.data.comments)
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
      url: `http://localhost:4000/api/posts/${id}/comments/create-comment`,
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
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export default CommentContext
