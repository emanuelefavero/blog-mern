import { useContext, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import Components
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Import Context
import UserContext from './context/UserContext'

function App() {
  const { getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute redirectPath='/login'>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* <Route
              path='/'
              element={
                <ProtectedRoute redirectPath='/login'>
                  <NewComment />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
