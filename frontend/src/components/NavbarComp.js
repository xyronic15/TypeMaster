import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">TypeMaster</Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Nav.Link href="/test">Take a Test</Nav.Link>
                <Nav.Link href="/high-scores">High Scores</Nav.Link>
              </Nav>
              <Nav className="me-2">
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                <div className="vr" />
                <Nav.Link href="sign-in">Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
