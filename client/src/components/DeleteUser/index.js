import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  fetchUsersDetails,
  logout,
  adminDeleteUser,
  adminDeleteSelf
} from "../../actions/user/user";
import { connect } from "react-redux";
import AdminNavBar from "../AdminNavBar";
import DeleteUserList from "../DeleteUserList";

export class DeleteUser extends Component {
  componentDidMount() {
    this.props.fetchUsersDetails();
  }

  adminDeleteUser = async id => {
    await this.props.adminDeleteUser(id);

    if (!this.props.error) {
      this.checkIfAdminDeletedSelf(id);
    }
  };

  checkIfAdminDeletedSelf = id => {
    const ownAccountDeleted = id === this.props.currentAdminUser._id;

    if (ownAccountDeleted) {
      this.props.adminDeleteSelf();
      this.props.history.push("/");
    }
  };

  static propTypes = {
    fetchUsersDetails: PropTypes.func,
    logout: PropTypes.func,
    adminDeleteUser: PropTypes.func,
    adminDeleteSelf: PropTypes.func,
    allUsers: PropTypes.array,
    currentAdminUser: PropTypes.object,
    error: PropTypes.string
  };

  render() {
    const { allUsers } = this.props;
    return !allUsers ? (
      <div>
        <p>Loading...</p>
      </div>
    ) : (
      <Fragment>
        <AdminNavBar />
        <div className="container" data-test='delete-user'>
          <DeleteUserList
            users={this.props.allUsers}
            adminDeleteUser={this.adminDeleteUser}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: state.user.users,
  currentAdminUser: state.user.user,
  error: state.user.error
});

export default connect(
  mapStateToProps,
  { fetchUsersDetails, logout, adminDeleteUser, adminDeleteSelf }
)(DeleteUser);
