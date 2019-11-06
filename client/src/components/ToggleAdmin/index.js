import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { fetchUsersDetails, logout } from "../../actions/user/user";
import { connect } from "react-redux";
import ToggleAdminList from "../ToggleAdminList";
import AdminNavBar from "../AdminNavBar";

export class ToggleAdmin extends Component {
  componentDidMount() {
    this.props.fetchUsersDetails();
  }

  checkAdminStatus = (isAdmin, logout, users) => {
    if (!isAdmin) {
      logout();
      return <Redirect data-test='redirect' to="/" />;
    } else {
      return (
        <div data-test='toggle-admin' className="container">
          <ToggleAdminList data-test='list' users={users} />
        </div>
      );
    }
  };

  static propTypes = {
    fetchUsersDetails: PropTypes.func,
    logout: PropTypes.func,
    users: PropTypes.array,
    isAdmin: PropTypes.bool
  };

  render() {
    const { users, isAdmin, logout } = this.props;
    return !users ? (
      <div>
        <p>Loading...</p>
      </div>
    ) : (
      <Fragment>
        <AdminNavBar data-test='navbar' />
        {this.checkAdminStatus(isAdmin, logout, users)}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  isAdmin: state.user.user.isAdmin
});

export default connect(
  mapStateToProps,
  { fetchUsersDetails, logout }
)(ToggleAdmin);
