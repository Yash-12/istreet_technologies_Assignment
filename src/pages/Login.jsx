import { useState, useContext } from 'react'
import { Container, Card } from 'react-bootstrap'
import LoginForm from '../components/LoginForm'
import AuthContext from '../context/AuthContext'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [error, setError] = useState('')

  const handleLogin = async (credentials) => {
    try {
      const success = await login(credentials)
      if (!success) {
        setError('Invalid username or password')
      }
    } catch  {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh'}}>
      <Card style={{ width: '400px',}}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <LoginForm onLogin={handleLogin} error={error} style={{color:'red'}}/>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login