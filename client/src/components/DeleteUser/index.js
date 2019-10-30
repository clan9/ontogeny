import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchUsersDetails } from "../../actions/user/user";
import { connect } from "react-redux";
import DeleteUserList from "../DeleteUserList";

export class DeleteUser extends Component {
  componentDidMount() {
    this.props.fetchUsersDetails();
  }
  static propTypes = {
    fetchUsersDetails: PropTypes.func
  };

  render() {
    const { users } = this.props;
    return !users ? (
      <div>
        <p>Loading...</p>
      </div>
    ) : (
      <div>
        <DeleteUserList users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  { fetchUsersDetails }
)(DeleteUser);
