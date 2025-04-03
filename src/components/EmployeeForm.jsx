import { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

const EmployeeForm = ({ show, onHide, onSubmit, initialData }) => {
  const [employeeData, setEmployeeData] = useState(
    initialData || {
      employeeId: '',
      name: '',
      address: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      mobileNumber: ''
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(employeeData)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Employee' : 'Add New Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={employeeData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={employeeData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={employeeData.state}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              type="text"
              name="postcode"
              value={employeeData.postcode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={employeeData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="mobileNumber"
              value={employeeData.mobileNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {initialData ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EmployeeForm