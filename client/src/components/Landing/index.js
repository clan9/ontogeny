import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Landing = props => {
  return (
    <div className="landing" data-test="landing-component">
      <h1 className="landing__title" data-test="welcome">
        Welcome!
      </h1>
      <div className="landing__actions">
        <button className="landing__actions__button" data-test="signup">
          Sign Up!
        </button>
        <button className="landing__actions__button" data-test="signin">
          Sign In
        </button>
        <button
          className="landing__actions__button landing__actions__button--admin"
          data-test="admin"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
