import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user/user";
import "./styles.scss";

const AdminNavBar = props => {
  return (
    <div className="adminNavBar">
      <NavLink to="/menuForAdminUser" className="adminNavBar__link">
        Ontogeny
      </NavLink>
      <NavLink
        to="/"
        data-test="logoutLink"
        onClick={() => {
          props.logout();
        }}
        className="adminNavBar__link"
      >
        Log out
      </NavLink>
    </div>
  );
};

AdminNavBar.propTypes = {
  logout: PropTypes.func
};

export default connect(
  null,
  { logout }
)(AdminNavBar);
