import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../css/Register.css";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", user);
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      console.error(err.response.data);
    }
  };

  return (
    <>
      <Container>
        <Card className="registerCard">
          <Card.Header className="text-center">
            <h3>Register</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="fas fa-user"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="fname"
                        type="text"
                        placeholder="Enter Your First Name"
                        autoComplete="off"
                        value={user.fname}
                        onChange={handleUser}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="fas fa-user"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        name="lname"
                        type="text"
                        placeholder="Enter Your Last Name"
                        autoComplete="off"
                        value={user.lname}
                        onChange={handleUser}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-envelope"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter Your Email ID"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleUser}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-key"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleUser}
                  />
                </InputGroup>
              </Form.Group>
              <div className="text-center">
                <Button
                  className="regBtn"
                  variant="outline-primary"
                  size="lg"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="regBtn"
                  variant="outline-warning"
                  size="lg"
                  type="reset"
                >
                  Reset
                </Button>
              </div>
              {error && (
                <span style={{ color: "red", marginTop: "10px" }}>
                  This user already exists!
                </span>
              )}
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <Card.Text>
              Already Registered? <NavLink to="/login">Login Here</NavLink>
            </Card.Text>
          </Card.Footer>
        </Card>

        <div className="col-sm-4 signup">
          <div className="card social-block">
            <div className="card-body">
              <a className="btn btn-block" href="/auth/google" role="button">
                <i className="fab fa-google"></i>
                Sign Up with Google
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
