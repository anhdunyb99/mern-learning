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
import loginImg from "../../assets/social-media-marketing.png";
import fbLogo from "../../assets/Facebook.svg.png";
import googleLogo from "../../assets/google.png";
import "./Style.css";
//import "../styles/Style.css";
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

  /* <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
            />
            <FacebookLogin
              appId={FaceBookId}
              autoLoad={false}
              size="small"
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            /> */
  return (
    <div className="container">
      <div className="login-left">
        <div className="login-header">
          <h1>Learnit</h1>
          <h4>keep track what you are learning</h4>
        </div>
        <form className="login-form" onSubmit={login}>
          <div className="login-form-content">
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={onChangeLoginForm}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={onChangeLoginForm}
                required
              />
            </div>
            <div className="form-item">
              <div className="checkbox">
                <input type="checkbox" id="rememberMeCheckBox"></input>
                <label htmlFor="rememberMeCheckbox" className="checkboxLabel">
                  Remeber me
                </label>
              </div>
            </div>
            <button style={{ border: "1px solid black" }} type="submit">
              Sign In
            </button>
          </div>
          <div className="login-form-footer">
            <GoogleLogin
              clientId={clientId}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={false}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{ border: "1px solid black" }}
                >
                  <div>
                    <img src={googleLogo} width="30" />
                    Google Login
                  </div>
                </button>
              )}
            />
            <FacebookLogin
              appId={FaceBookId}
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              cssClass="btnFacebook"
              icon={<img src={fbLogo} width="30" />}
              textButton="&nbsp;&nbsp;Facebook Login"
            />
          </div>
          <p>Dont have account yet ?</p>
          <Link to="/register">
            <button style={{ border: "1px solid black" }} type="submit">
              Register
            </button>
          </Link>
        </form>
      </div>
      <div className="login-right">
        <img src={loginImg}></img>
      </div>
    </div>
  );
};

export default LoginForm;
