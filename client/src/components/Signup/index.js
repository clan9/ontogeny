import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../actions/user/user";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      errorMsg: ""
    };
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordOneChange = e => {
    const passwordOne = e.target.value;
    this.setState(() => ({ passwordOne }));
  };

  onPasswordTwoChange = e => {
    const passwordTwo = e.target.value;
    this.setState(() => ({ passwordTwo }));
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, passwordOne, passwordTwo } = this.state;

    if (!name || !email) {
      const errorMsg = "Please provide a name, email address and password";
      this.setState(() => ({ errorMsg }));
      this.resetError();
    } else if (!validator.isEmail(this.state.email)) {
      const errorMsg = "Please provide a valid email address";
      this.setState(() => ({ errorMsg }));
      this.resetError();
    } else if (passwordOne !== passwordTwo) {
      const errorMsg = "Passwords do not match";
      this.setState(() => ({ errorMsg }));
      this.resetError();
    } else {
      this.setState(() => ({ errorMsg: "" }));
      this.props.registerUser({ name, email, password: passwordOne });
    }
  };

  resetError = () => {
    setTimeout(() => {
      this.setState(() => ({ errorMsg: "" }));
    }, 5000);
  };

  static propTypes = {
    registerUser: PropTypes.func,
    serverErrorMsg: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to="/dash" />
    ) : (
      <Fragment>
        <form
          className="login-form"
          data-test="signup-component"
          onSubmit={this.onSubmit}
        >
          <div className="login-form__error-container">
            {this.state.errorMsg && (
              <p className="login-form__errorMsg">{this.state.errorMsg}</p>
            )}
            {this.props.serverErrorMsg && (
              <p className="login-form__errorMsg">
                {this.props.serverErrorMsg}
              </p>
            )}
          </div>
          <input
            type="text"
            className="login-form__field"
            data-test="nameField"
            name="name"
            placeholder="Enter name"
            autoFocus
            autoComplete="off"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            type="email"
            className="login-form__field"
            data-test="emailField"
            name="email"
            placeholder="Email address"
            autoComplete="off"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <input
            type="password"
            className="login-form__field"
            name="passwordOne"
            data-test="passwordFieldOne"
            placeholder="Enter password"
            value={this.state.passwordOne}
            onChange={this.onPasswordOneChange}
          />
          <input
            type="password"
            className="login-form__field"
            name="passwordTwo"
            data-test="passwordFieldTwo"
            placeholder="Confirm password"
            value={this.state.passwordTwo}
            onChange={this.onPasswordTwoChange}
          />
          <button
            type="submit"
            className="login-form__button"
            data-test="submitButton"
          >
            Sign Up
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
  { registerUser }
)(Signup);
