import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DeleteUserListItem from "../DeleteUserListItem";

export const DeleteUserList = ({
  users,
  successMsg,
  errorMsg,
  adminDeleteUser
}) => {
  return (
    <div data-test="user-list" className="adminList">
      <h2 data-test="header" className="adminList__header">
        Current User List
      </h2>
      <div data-test="error-container" className="adminList__message-container">
        {(successMsg || errorMsg) && (
          <p data-test="message" className="adminList__message">
            {successMsg || errorMsg}
          </p>
        )}
      </div>
      <div data-test="list-items">
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
  errorMsg: PropTypes.string,
  adminDeleteUser: PropTypes.func
};

const mapStateToProps = state => ({
  successMsg: state.user.adminStatusMsg,
  errorMsg: state.user.error
});

export default connect(mapStateToProps)(DeleteUserList);
