import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../css/Login.css";
import { Context } from "../context/Context";
import axios from "axios";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {dispatch} = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  
  return (
    <>
      <Container>
        <Card className="loginCard">
          <Card.Header className="text-center">
            <h3>Login</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-envelope"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    ref={emailRef}
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
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    ref={passwordRef}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <div class="text-center">
                <Button
                  className="loginBtn"
                  variant="outline-primary"
                  size="lg"
                  type="submit"
                  
                >
                  Submit
                </Button>
                <Button
                  className="loginBtn"
                  variant="outline-warning"
                  size="lg"
                  type="reset"
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <Card.Text>
              Don't have an account?{" "}
              <NavLink to="/register">Sign Up Here</NavLink>
            </Card.Text>
            <Card.Text>
              <NavLink to="#">Forgot Password</NavLink>
            </Card.Text>
          </Card.Footer>
        </Card>

        <div className="col-sm-4 signin">
          <div className="card">
            <div className="card-body">
              <a className="btn btn-block" href="/auth/google" role="button">
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
