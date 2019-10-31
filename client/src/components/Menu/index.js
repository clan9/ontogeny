import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout, deleteUser } from "../../actions/user/user";
import "./styles.scss";

export const Menu = props => {
  return props.isAuthenticated ? (
    <div data-test="menu-component" className="container">
      <header data-test="header" className="header">
        <h3>Hello {props.name}</h3>
      </header>

      <p data-test="paragraph" className="menu-paragraph">
        What would you like to do?
      </p>
      <div className="menu">
        <Link to="/expenses" data-test="expenseLink" className="menu__link">
          Go to expenses page
        </Link>
        <Link to="/income" data-test="incomeLink" className="menu__link">
          Go to income page
        </Link>
        <Link to="/dash" data-test="dashboardLink" className="menu__link">
          Go to stats page
        </Link>
        <Link
          to="/"
          data-test="logoutLink"
          onClick={() => {
            props.logout();
          }}
          className="menu__link"
        >
          Log out
        </Link>
        <button onClick={() => props.deleteUser()} className="menu__button">
          Delete your account
        </button>
      </div>
    </div>
  ) : (
    <Redirect to="/" data-test="redirect" />
  );
};

Menu.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  logout: PropTypes.func,
  deleteUser: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name
});

export default connect(
  mapStateToProps,
  { logout, deleteUser }
)(Menu);
