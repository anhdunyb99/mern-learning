import React from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

function Auth({ authRoute }) {
  let body;
  body = (
    <div>
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </div>
  );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learnit</h1>
          <h4>keep track what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
