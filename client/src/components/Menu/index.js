import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/user/user";
import UserNavBar from "../UserNavbar.js";
import "./styles.scss";

export const Menu = props => {
  return props.isAuthenticated ? (
    <div className="menu">
      <UserNavBar />
      <div data-test="menu-component" className="container">
        <header data-test="header" className="menu__header">
          <h3>Hello {props.name}</h3>
        </header>

        <p data-test="paragraph" className="menu__paragraph">
          What would you like to do?
        </p>
        <div data-test='error-container' className="menu__error-container">
          {props.error && (
          <p className="menu__error-msg">{props.error}</p>
          )}
        </div>
        <div className="menu__items">
          <Link to="/expenses" data-test="expenseLink" className="menu__link">
            View/Edit Expenses
          </Link>
          <Link to="/income" data-test="incomeLink" className="menu__link">
            View/Edit Income
          </Link>
          <Link to="/dash" data-test="dashboardLink" className="menu__link">
            View Stats
          </Link>
          <button onClick={() => props.deleteUser()} className="menu__button">
            Delete account
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" data-test="redirect" />
  );
};

Menu.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  deleteUser: PropTypes.func,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name,
  error: state.user.error
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(Menu);
