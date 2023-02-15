import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext, useState } from "react";
import AlertMessage from "../layout/AlertMessage";
import loginImg from "../../assets/social-media-marketing.png";
import "./Style.css";
const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  //let navigate = useNavigate();
  const { username, password, confirmPassword } = registerForm;
  const onChangeRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };
  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Pass k dung" });
      setTimeout(() => setAlert(null), 5000);
    }
    try {
      const registerData = await registerUser(registerForm);
      console.log("registerForm", registerForm);
      if (!registerData.success) {
        setAlert({
          type: "danger",
          message: registerData.message,
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            style={{ width: "auto" }}
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ width: "auto" }}
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ width: "auto" }}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="ml-3">
          Register
        </Button>
      </Form>

      <p>Already have account ?</p>
      <Link to="/login">
        <Button variant="info" size="sm" className="ml-3">
          Login
        </Button>
      </Link> */
  return (
    <div>
      <div className="container">
        <div className="login-left">
          <div className="login-header">
            <h1>Register</h1>
            <h4>Please register your account</h4>
            <form className="login-form" onSubmit={register}>
              <div className="login-form-content">
                <div className="form-item">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeRegisterForm}
                    required
                  ></input>
                </div>
                <div className="form-item">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangeRegisterForm}
                    required
                  ></input>
                </div>
                <div className="form-item">
                  <label htmlFor="confirmPassword">ConfirmPassword</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                    required
                  ></input>
                </div>
                <button style={{ border: "1px solid black" }} type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="login-right">
        <img src={loginImg}></img>
      </div>
      </div>
    </div>
  );
};

export default RegisterForm;
