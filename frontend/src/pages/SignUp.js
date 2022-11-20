import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import AuthContext from "../context/AuthContext";

export default function SignUp() {
  let { user, addUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialFormValues = {
    email: "",
    username: "",
    password: "",
    password2: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  // const [validated, setValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(validate(formValues));
    // console.log(validated);
  };

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
    // if (JSON.stringify(formErrors) === "{}") {
    //   setValidation(true);
    // } else {
    //   setValidation(false);
    // }
    // console.log(formErrors);
    // console.log(validated);
  }, []);

  // TBC
  return (
    <Container className="d-grid validationContainer">
      <Card className="p-3" style={{ width: "35%" }}>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <p className="text-danger">{formErrors.email}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
            <p className="text-danger">{formErrors.username}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <p className="text-danger">{formErrors.password}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              placeholder="Repeat your password"
              onChange={handleChange}
            />
            <p className="text-danger">{formErrors.password2}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
}
