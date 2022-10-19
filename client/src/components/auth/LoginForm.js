import React from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import AlertMessage from "../layout/AlertMessage";
const LoginForm = () => {
  // context
  const { loginUser } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const { username, password } = loginForm;
  const onChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
      } else {
        console.log("logdindata", loginData);
        setAlert({
          type: "danger",
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            style={{ width: "auto" }}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            style={{ width: "auto" }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>

      <p>Dont have account yet ?</p>
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-2">
          Register
        </Button>
      </Link>
    </>
  );
};

export default LoginForm;
