import React, { useContext, useEffect } from "react";
import { Form, Container, Card, Stack } from "react-bootstrap";
import { Button } from '../components'
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Container className="d-grid validationContainer">
        <Card className="p-5">

          {/* upon submitting the form, pass the event info to the loginUser function */}
          <form onSubmit={loginUser}>
            <Stack gap={5} className="align-items-center">
              <h2>Sign In</h2>
              <Form.Group className="w-100" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="my-3"
                />
              </Form.Group>

              <Form.Group className="w-100" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="my-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%" }} className="py-2">
                Submit
              </Button>
            </Stack>

          </form>
        </Card>
      </Container>
    </motion.div>

  );
}
