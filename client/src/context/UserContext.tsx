import React, { useState, createContext } from 'react'
import axios from 'axios'

// INTERFACES
interface UserInterface {
  _id: string
  username: string
  password: string
  role: string
}

// CONTEXT
const UserContext = createContext({
  user: {} as UserInterface | null, // TODO: add '| null'?
  registerUsername: '',
  setRegisterUsername: (username: string) => {},
  registerPassword: '',
  setRegisterPassword: (password: string) => {},

  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},

  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const register = async () => {
    try {
      const { data } = await axios.post('/api/register', {
        username: registerUsername,
        password: registerPassword,
      })
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async () => {
    try {
      const { data } = await axios.post('/api/login', {
        username: loginUsername,
        password: loginPassword,
      })
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/logout')
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  // GET user
  const getUser = async () => {
    try {
      const { data } = await axios.get('/api/user')
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,

        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,

        register,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
