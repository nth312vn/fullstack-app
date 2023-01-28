import axiosClient, { getRequest, postRequest } from 'https/axiosClient';
import { defaultValueLogin, FieldNameLogin } from 'constants/login.constant';
import { pathName } from 'constants/pathName.constant';
import useForm, { FormValues } from 'hooks/useForm';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const form = useForm({
    defaultValue: defaultValueLogin,
    validation: {
      [FieldNameLogin.userName]: (value) => {
        if (!value) {
          return 'This field is required';
        }
        return '';
      },
    },
  });

  const { formData, handleBlur, onChange, handleSubmit } = form;
  const handleSubmitForm = (data: FormValues) => {
    postRequest('api/auth/login');
  };

  return (
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, handleSubmitForm);
      }}
    >
      <h1>Learn It</h1>
      <p>Learn everything</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <p>Usesrname</p>
        <Form.Control
          name={FieldNameLogin.userName}
          onBlur={handleBlur}
          value={formData[FieldNameLogin.userName]}
          onChange={onChange}
          type="text"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <p>Password</p>
        <Form.Control
          name={FieldNameLogin.password}
          onBlur={handleBlur}
          value={formData[FieldNameLogin.password]}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Login
      </Button>
      <p>
        {"Don't have an account "}
        <Link to={pathName.REGISTER}>Register now</Link>
      </p>
    </Form>
  );
};

export default Login;
