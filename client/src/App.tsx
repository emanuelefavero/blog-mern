import styles from './App.module.css'
import { useContext, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import { CommentProvider } from './context/CommentContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import Components
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'

// Import Context
import UserContext from './context/UserContext'

// TODO: Add a loading spinner
// TODO: Add 'createdAt' to posts and comments

function App() {
  const { getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.App}>
      <UserProvider>
        <PostProvider>
          <CommentProvider>
            <Router>
              <Header />
              <main>
                <Routes>
                  {/* HOME */}
                  <Route path='/' element={<Home />} />

                  {/* POSTS */}
                  <Route path='/posts/:id' element={<Post />} />
                  <Route
                    path='/posts/create-post'
                    element={
                      <ProtectedRoute redirectPath='/login'>
                        <CreatePost />
                      </ProtectedRoute>
                    }
                  />

                  {/* AUTH */}
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Routes>
              </main>
              <Footer />
            </Router>
          </CommentProvider>
        </PostProvider>
      </UserProvider>
    </div>
  )
}

export default App
