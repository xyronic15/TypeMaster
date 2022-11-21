import React, { useContext, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Sign in page
export default function SignIn() {
  // context data
  let { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // check if the user is logged in already
  // if so then go to home page
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  // return sing in form
  return (
    <Container className="d-grid validationContainer">
      <Card className="p-3" style={{ width: "35%" }}>

        {/* upon submitting the form, pass the event info to the loginUser function */}
        <form onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
}
