import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteUserListItem from "../DeleteUserListItem";

const DeleteUserList = ({ users, successMsg, errorMsg, adminDeleteUser }) => {
  return (
    <div className="adminList">
      <h2 className="adminList__header">Current status</h2>
      <div className="adminList__message-container">
        {(successMsg || errorMsg) && (
          <p className="adminList__message">{successMsg || errorMsg}</p>
        )}
      </div>
      <div>
        {users.map(user => (
          <DeleteUserListItem
            user={user}
            key={user._id}
            adminDeleteUser={adminDeleteUser}
          />
        ))}
      </div>
    </div>
  );
};

DeleteUserList.propTypes = {
  users: PropTypes.array,
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = state => ({
  successMsg: state.user.adminStatusMsg,
  errorMsg: state.user.error
});

export default connect(mapStateToProps)(DeleteUserList);
