import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/admin"
              element={
                <AuthRoute role="admin">
                  <AdminDashboard />
                </AuthRoute>
              }
            />
            <Route
              path="/user"
              element={
                <AuthRoute role="user">
                  <UserDashboard />
                </AuthRoute>
              }
            />
           
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
