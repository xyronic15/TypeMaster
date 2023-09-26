import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import AuthContext from "../context/AuthContext";

// Navbar component on the top of every page
const NavbarComp = (props) => {
  let { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">TypeMaster</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* Common links */}
            <Nav className="me-auto">
              <Nav.Link href="/test">Take a Test</Nav.Link>
              <Nav.Link href="/high-scores">High Scores</Nav.Link>
              {user ? (<Nav.Link href="/records">Your Records</Nav.Link>) : null}
            </Nav>

            {/* Adjust links based on whether user is logged in or not */}
            {user ? (
              // TBC
              <Nav className="me-2">
                <Nav.Link disabled>Hello {user.username}</Nav.Link>
                <div className="vr" />
                <Nav.Link onClick={logout}>Sign Out</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-2">
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                <div className="vr" />
                <Nav.Link href="sign-in">Sign In</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarComp;