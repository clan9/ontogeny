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
        <div className="menu__items">
          <Link to="/expenses" data-test="expenseLink" className="menu__link">
            Go to expenses page
          </Link>
          <Link to="/income" data-test="incomeLink" className="menu__link">
            Go to income page
          </Link>
          <Link to="/dash" data-test="dashboardLink" className="menu__link">
            Go to stats page
          </Link>
          <button onClick={() => props.deleteUser()} className="menu__button">
            Delete your account
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
  deleteUser: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(Menu);
