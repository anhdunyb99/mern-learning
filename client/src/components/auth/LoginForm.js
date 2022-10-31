import React from "react";
import Button from "react-bootstrap/Button";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import AlertMessage from "../layout/AlertMessage";
import { useEffect } from "react";
const clientId =
  "69298724862-griorc4anl39v3ds6i22epk5st2jujpp.apps.googleusercontent.com";
const FaceBookId = "3547471218814811";
const LoginForm = () => {
  // context
  const { loginUser, loginWithGoogle, loginWithFaceBook } =
    useContext(AuthContext);
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
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    loginWithGoogle(res.profileObj);
  };
  const onFailure = (err) => {
    console.log("onFailure");
  };

  const responseFacebook = (response) => {
    console.log("response", response);
    loginWithFaceBook(response);
  };

  const componentClicked = () => {
    console.log("componentClicked");
  };
  return (
    <div>
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
        <Button variant="success" type="submit" style={{ marginLeft: "60px" }}>
          Login
        </Button>
      </Form>
      <Form.Group>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
        />
      </Form.Group>
      <Form.Group>
        <FacebookLogin
          appId={FaceBookId}
          autoLoad={false}
          size="small"
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      </Form.Group>
      <p>Dont have account yet ?</p>
      <Form.Group>
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </Form.Group>
    </div>
  );
};

export default LoginForm;
