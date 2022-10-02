import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginForm;
  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
      </Form>
      <Button variant="success" type="submit" className="ml-3">
        Login
      </Button>
      <p>Dont have account yet ?</p>
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-3">
          Register
        </Button>
      </Link>
    </div>
  );
};

export default LoginForm;
