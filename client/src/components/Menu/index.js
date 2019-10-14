import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const Menu = props => {
  return props.isAuthenticated ? (
    <div data-test="menu-component">
      <header data-test="header">
        <h3>Welcome {props.name}</h3>
      </header>

      <p data-test="paragraph">What would you like to do?</p>
      <div>
        <Link to="/expenses" data-test="expenseLink">
          Go to expenses page
        </Link>
        <Link to="/income" data-test="incomeLink">
          Go to income page
        </Link>
        <Link to="/dash" data-test="dashboardLink">
          Go to dashboard page
        </Link>
      </div>
    </div>
  ) : (
    <Redirect to="/" data-test="redirect" />
  );
};

Menu.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name
});

export default connect(mapStateToProps)(Menu);
