import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import "./NavbarComp.css"
import AuthContext from "../../context/AuthContext";

// Navbar component on the top of every page
const NavbarComp = (props) => {
  let { user, logout } = useContext(AuthContext);
  return (
    <Navbar expand="md" variant="dark" className="sticky-top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={process.env.PUBLIC_URL + "/logos/tm_logo_hori_mono.png"}
            className="d-inline-block align-top"
            height="40"
            alt="TypeMaster"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Common links */}
          <Nav className="ms-auto">
            <Nav.Link href="/test">Test</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>

            {/* Adjust links based on whether user is logged in or not */}
            {user ? (
              <NavDropdown title={
                <>
                  Welcome {user.username}
                  <IoPersonCircleSharp size={25} className="ms-1 d-inline-block align-top" />
                </>} className="me-2">
                <NavDropdown.Item href="/records">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
                <Nav.Link href="sign-in">Sign In</Nav.Link>
              </>
            )}
          </Nav>

          {/* Adjust links based on whether user is logged in or not */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarComp;