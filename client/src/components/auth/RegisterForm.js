import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <input type="text" placeholder="Username" name="username" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            required
          />
        </Form.Group>
      </Form>
      <Button variant="success" type="submit" className="ml-3">
        Register
      </Button>
      <p>Already have account ?</p>
      <Link to="/login">
        <Button variant="info" size="sm" className="ml-3">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default RegisterForm;
