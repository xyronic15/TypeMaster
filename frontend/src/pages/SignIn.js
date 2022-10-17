import React, { useContext } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export default function SignIn() {
  let { loginUser } = useContext(AuthContext);

  return (
    <Container className="d-grid validationContainer">
      <Card className="p-3" style={{ width: "35%" }}>
        <form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
}
