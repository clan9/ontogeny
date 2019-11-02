import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { fetchUsersDetails } from "../../actions/user/user";
import { connect } from "react-redux";
import { logout } from "../../actions/user/user";
import ToggleAdminList from "../ToggleAdminList";
import AdminNavBar from "../AdminNavBar";

export class ToggleAdmin extends Component {
  componentDidMount() {
    this.props.fetchUsersDetails();
  }

  checkAdminStatus = (isAdmin, logout, users) => {
    if (!isAdmin) {
      logout();
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <ToggleAdminList users={users} />
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
        <AdminNavBar />
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
