import { pathName } from 'constants/pathName.constant';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => (
  <Form>
    <h1>Learn It</h1>
    <p>Learn everything</p>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <p>Usesrname</p>
      <Form.Control type="text" placeholder="Enter your username" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <p>Password</p>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <p>Confirm password</p>
      <Form.Control type="password" placeholder="Confirm password" />
    </Form.Group>
    <Button variant="success" type="submit">
      Register
    </Button>
    <p>
      You have an account
      <Link to={pathName.LOGIN}>Login</Link>
    </p>
  </Form>
);

export default Register;
