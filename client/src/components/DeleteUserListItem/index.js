import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { adminDeleteUser } from "../../actions/user/user";

const DeleteUserListItem = ({ user, adminDeleteUser }) => {
  return (
    <div>
      <p>Name: {user.name}</p>
      <button onClick={() => adminDeleteUser({ email: user.email })}>
        Delete this user
      </button>
    </div>
  );
};

DeleteUserListItem.propTypes = {
  user: PropTypes.object,
  adminDeleteUser: PropTypes.func
};

export default connect(
  null,
  { adminDeleteUser }
)(DeleteUserListItem);
