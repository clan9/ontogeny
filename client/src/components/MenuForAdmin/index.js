import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user/user";

/**
 * Layout
 *  Admin:
 *   View all users stats
 *   Give another user admin access
 *  General:
 *   Go to your account
 *   Logout
 */

export const MenuForAdmin = props => {
  return props.isAuthenticated ? (
    <div data-test="menuForAdmin-component">
      <header data-test="header">
        <h3>Welcome {props.name} (Admin)</h3>
      </header>

      <p data-test="paragraph">What would you like to do?</p>

      <div>
        <Link to="/dashAdmin" data-test="dashboardLink">
          View all users stats
        </Link>
        <Link to="/menu" data-test="menuLink">
          Go to your account
        </Link>
        <Link to="/toggleAdmin" data-test="toggleAdminLink">
          Add/Remove Admin access for another user
        </Link>
        <Link
          to="/"
          data-test="logoutLink"
          onClick={() => {
            props.logout();
          }}
        >
          Log out
        </Link>
      </div>
    </div>
  ) : (
    <Redirect to="/" data-test="redirect" />
  );
};

MenuForAdmin.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  logout: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name
});

export default connect(
  mapStateToProps,
  { logout }
)(MenuForAdmin);
