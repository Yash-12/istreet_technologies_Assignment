import { createContext, useState, useEffect } from 'react'
// import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const fakeAuthService = {
  login: async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          resolve({
            token: 'fake-admin-token',
            user: {
              id: 1,
              username: 'admin',
              role: 'admin',
              name: 'Admin User'
            }
          })
        } else if (credentials.username === 'user' && credentials.password === 'user123') {
          resolve({
            token: 'fake-user-token',
            user: {
              id: 2,
              username: 'user',
              role: 'user',
              name: 'Regular User'
            }
          })
        } else {
          const users = JSON.parse(localStorage.getItem('users')) || []
          const user = users.find(
            u => (u.email === credentials.username || u.username === credentials.username) && 
                 u.password === credentials.password
          )
          if (user) {
            resolve({
              token: `fake-user-token-${user.id}`,
              user: {
                id: user.id,
                username: user.email,
                role: 'user',
                name: user.firstName
              }
            })
          } else {
            throw new Error('Invalid credentials')
          }
        }
      }, 500)
    })
  },
  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 100)
    })
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      setAuthState({
        token,
        user: JSON.parse(user),
        isAuthenticated: true
      })
    }
  }, [])

  const login = async (credentials) => {
    try {
      const { token, user } = await fakeAuthService.login(credentials)
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      setAuthState({
        token,
        user,
        isAuthenticated: true
      })

      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = async () => {
    await fakeAuthService.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    })
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
