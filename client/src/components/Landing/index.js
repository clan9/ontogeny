import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const Landing = props => {
  return (
    <div className="landing" data-test="landing-component">
      <h1 className="landing__title" data-test="welcome">
        Welcome!
      </h1>
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
  );
};

export default Landing;
