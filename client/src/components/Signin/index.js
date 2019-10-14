import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../actions/user/user";

export class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMsg: ""
    };
  }

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      const errorMsg = "Please provide your email and password";
      this.setState(() => ({ errorMsg }));
      this.resetError();
    } else if (!validator.isEmail(email)) {
      const errorMsg = "Please provide a valid email address";
      this.setState(() => ({ errorMsg }));
      this.resetError();
    } else {
      this.setState(() => ({ errorMsg: "" }));
      this.props.signIn({ email, password });
    }
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ errorMsg: "" }));
    }, 5000);
  };

  static propTypes = {
    signIn: PropTypes.func,
    serverErrorMsg: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/menu" />
    ) : (
      <Fragment>
        <header data-test="page-header">
          <h2>Sign In</h2>
        </header>
        <form
          className="login-form"
          data-test="signin-component"
          onSubmit={this.onSubmit}
        >
          <div className="login-form__error-container">
            {this.state.errorMsg && (
              <p
                className="login-form__errorMsg"
                data-test="error-paragraphOne"
              >
                {this.state.errorMsg}
              </p>
            )}
            {this.props.serverErrorMsg && (
              <p
                className="login-form__errorMsg"
                data-test="error-paragraphTwo"
              >
                {this.props.serverErrorMsg}
              </p>
            )}
          </div>
          <input
            type="email"
            className="login-form__field"
            data-test="emailField"
            placeholder="Enter your email address"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <input
            type="password"
            className="login-form__field"
            data-test="passwordField"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button
            type="submit"
            className="login-form__button"
            data-test="signInButton"
          >
            Sign In
          </button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  serverErrorMsg: state.user.error,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(
  mapStateToProps,
  { signIn }
)(Signin);