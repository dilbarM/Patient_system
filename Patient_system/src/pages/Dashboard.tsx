import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col>
          <h3>Welcome to Patient Registration System</h3>
          <p className="text-muted">Use the sidebar to register,view patient lists and to use query</p>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Register Patients</Card.Title>
              <Card.Text>
                Form to add new patients details and their medical records
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>View & query patients</Card.Title>
              <Card.Text>
                Use sql query to search and view patient data efficiently
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Patient List</Card.Title>
              <Card.Text>
                All data is stored in your local browser using pglite
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
