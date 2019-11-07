import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Landing = props => {
  return (
    <div className="landing" data-test="landing-component">
      <div className="landing__box">
        <h1 className="landing__title" data-test="welcome">
          Ontogeny
        </h1>
        <p className="landing__definition">
          "a process of becoming larger or more numerous or more important"
        </p>
        <div className="landing__actions">
          <Link
            className="landing__actions__button"
            data-test="signup"
            to="/signup"
          >
            Sign Up!
          </Link>
          <Link
            className="landing__actions__button"
            data-test="signin"
            to="/signin"
          >
            Sign In
          </Link>
          <Link
            className="landing__actions__button landing__actions__button--admin"
            data-test="admin"
            to="/signinAdmin"
          >
            Admin
          </Link>
        </div>
      </div>
      <div className='admin-login-info'>
        <p>Admin Login:</p>
        <p>Email - s@gmail.com</p>
        <p>Password - 123456</p>
      </div>
    </div>
  );
};

export default Landing;
