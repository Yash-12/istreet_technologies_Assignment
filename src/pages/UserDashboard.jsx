import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import EmployeeTable from '../components/EmployeeTable'

const UserDashboard = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || []
    setEmployees(storedEmployees)
  }, [])

  return (
    <Container className="mt-4">
      <h2>Employee List</h2>
      <EmployeeTable employees={employees} canEdit={false} />
    </Container>
  )
}

export default UserDashboard