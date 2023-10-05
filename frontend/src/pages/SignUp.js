import React, { useContext, useEffect, useState } from "react";
import { Form, Container, Card, Stack } from "react-bootstrap";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";

// Sign up page
export default function SignUp() {
  // context data
  let { user, addUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // set initial values for the form
  const initialFormValues = {
    email: "",
    username: "",
    password: "",
    password2: "",
  };

  // state values for the form and error msgs
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});

  // call function on change
  // takes the values and sets teh form values to be submitted
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(validate(formValues));
    // console.log(validated);
  };

  // when submit button pressed check if the form values are ok and then submit using addUser
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(formValues);
    setFormErrors(errors);
    console.log(formValues);
    console.log(errors);
    if (errors.validated) {
      addUser(formValues);
    }
  };

  // Checks if form values are alright then sets the error msgs
  const validate = (fValues) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!fValues.username) {
      errors.username = "Username is required!";
    }
    if (!fValues.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(fValues.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!fValues.password) {
      errors.password = "Password is required";
    } else if (fValues.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    if (!fValues.password2) {
      errors.password2 = "Password is required";
    } else if (fValues.password !== fValues.password2) {
      errors.password2 = "Passwords do not match";
    }
    if (JSON.stringify(errors) === "{}") {
      errors.validated = true;
    }

    return errors;
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  // Sign up form
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Container className="d-grid validationContainer">
        <Card className="p-5">
          <form onSubmit={handleSubmit}>
            <Stack gap={4} className="align-items-center">
              <h2>Sign Up</h2>
              <Form.Group className="w-100" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="my-3"
                />
                <p className="text-danger">{formErrors.email}</p>
              </Form.Group>
              <Form.Group className="w-100">
                <Form.Control
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="my-3"
                />
                <p className="text-danger">{formErrors.username}</p>
              </Form.Group>
              <Form.Group className="w-100" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="my-3"
                />
                <p className="text-danger">{formErrors.password}</p>
              </Form.Group>
              <Form.Group className="w-100" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                  className="my-3"
                />
                <p className="text-danger">{formErrors.password2}</p>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Stack>

          </form>
        </Card>
      </Container>
    </motion.div>

  );
}
