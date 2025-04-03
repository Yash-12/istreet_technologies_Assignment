import { useState, useEffect } from 'react'
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Tabs, 
  Tab,
  Table 
} from 'react-bootstrap'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'
import UserForm from '../components/UserForm'

const AdminDashboard = () => {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem('employees')) || []
  )
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || [])
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('employees')

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('users', JSON.stringify(users))
  }, [employees, users])

  const handleAddEmployee = () => {
    setCurrentEmployee(null)
    setShowEmployeeForm(true)
  }

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee)
    setShowEmployeeForm(true)
  }

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((emp) => emp.employeeId !== employeeId))
    }
  }

  const handleEmployeeSubmit = (employeeData) => {
    if (currentEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.employeeId === currentEmployee.employeeId ? employeeData : emp
        )
      )
    } else {
      setEmployees([...employees, employeeData])
    }
  }

  const handleAddUser = () => {
    setCurrentUser(null)
    setShowUserForm(true)
  }

  const handleEditUser = (user) => {
    setCurrentUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const handleUserSubmit = (userData) => {
    if (currentUser) {
      setUsers(
        users.map((user) =>
          user.id === currentUser.id ? { ...user, ...userData } : user
        )
      )
    } else {
      const newUser = {
        ...userData,
        id: Date.now() 
      }
      setUsers([...users, newUser])
    }
  }

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="employees" title="Employee Management">
          <Row className="mb-3">
            <Col>
              <Button variant="primary" onClick={handleAddEmployee}>
                Add Employee
              </Button>
            </Col>
          </Row>
          <EmployeeTable
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
            canEdit={true}
          />
        </Tab>
        
        <Tab eventKey="users" title="User Management">
          <Row className="mb-3">
            <Col>
              <Button variant="primary" onClick={handleAddUser}>
                Create User
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.dob}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <EmployeeForm
        show={showEmployeeForm}
        onHide={() => setShowEmployeeForm(false)}
        onSubmit={handleEmployeeSubmit}
        initialData={currentEmployee}
      />

      <UserForm
        show={showUserForm}
        onHide={() => setShowUserForm(false)}
        onSubmit={handleUserSubmit}
        initialData={currentUser}
      />
    </Container>
  )
}

export default AdminDashboard