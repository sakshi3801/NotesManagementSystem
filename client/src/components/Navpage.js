import React, { useState, useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Context } from "../context/Context";
import '../css/navbar.css'

const Navpage = () => {
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  const { user, dispatch } = useContext(Context);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <>
      <Navbar
        className="sticky-top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand href="/" className='brand'>Notes<span>Quest</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <>
              <Nav className="mr-auto" id='main'>
                <LinkContainer id="router-link" to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer id="router-link" to="/profile">
                  <Nav.Link>My Profile</Nav.Link>
                </LinkContainer>

                <NavDropdown
                  title="Branch"
                  id="collasible-nav-dropdown"
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <LinkContainer id="router-link" to="/cse">
                    <NavDropdown.Item id='drop'>CSE</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id="router-link" to="/ece">
                    <NavDropdown.Item id='drop'>ECE</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <LinkContainer id="router-link" to="/about">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
              </Nav>

              <Nav className="ml-auto" id='button'>
                <Button variant="info" id='logout'><Nav.Link onClick={handleLogout}>Logout</Nav.Link></Button>
              </Nav>
            </>
          ) : (
            <Nav className="ml-auto">
              <LinkContainer id="router-link" to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer id="router-link" to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navpage;
