import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchUsersDetails } from "../../actions/user/user";
import { connect } from "react-redux";
import ToggleAdminList from "../ToggleAdminList";

export class ToggleAdmin extends Component {
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
        <ToggleAdminList users={users} />
      </div>
    );
  }
}

// create a fetch all user names (and emails) action/reducer/route etc?
// could then display a list of users for admin to select from !

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  { fetchUsersDetails }
)(ToggleAdmin);
