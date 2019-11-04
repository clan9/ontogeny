import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AdminNavBar from "../AdminNavBar";

export const MenuForAdmin = props => {
  return props.isAuthenticated ? (
    <Fragment>
      <AdminNavBar />
      <div data-test="menuForAdmin-component" className="container">
        <header data-test="header" className="menu__header">
          <h3>
            Welcome {props.name} <span>(Admin)</span>
          </h3>
        </header>

        <p data-test="paragraph" className="menu__paragraph">
          What would you like to do?
        </p>

        <div className="menu__items">
          <Link
            to="/dashAdmin"
            data-test="dashboardLink"
            className="menu__link"
          >
            View all users stats
          </Link>
          <Link
            to="/toggleAdmin"
            data-test="toggleAdminLink"
            className="menu__link"
          >
            Add/Remove Admin access for another user
          </Link>
          <Link
            to="/deleteUser"
            data-test="deleteUserLink"
            className="menu__link"
          >
            Delete a user
          </Link>
          <Link to="/menu" data-test="menuLink" className="menu__link">
            Go to your account
          </Link>
        </div>
      </div>
    </Fragment>
  ) : (
    <Redirect to="/" data-test="redirect" />
  );
};

MenuForAdmin.propTypes = {
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  name: state.user.user.name
});

export default connect(mapStateToProps)(MenuForAdmin);
