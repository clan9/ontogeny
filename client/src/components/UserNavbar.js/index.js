import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/user/user";
import "./styles.scss";

export const UserNavBar = props => {
  return (
    <div data-test='user-navbar' className="userNavBar">
      <NavLink data-test='menu-link' to="/menu" className="userNavBar__link">
        Ontogeny
      </NavLink>
      <NavLink
        to="/"
        data-test="logout-link"
        onClick={() => {
          props.logout();
        }}
        className="userNavBar__link"
      >
        Log out
      </NavLink>
    </div>
  );
};

UserNavBar.propTypes = {
  logout: PropTypes.func
};

export default connect(
  null,
  { logout }
)(UserNavBar);
