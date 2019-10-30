import React from "react";
import PropTypes from "prop-types";
import DeleteUserListItem from "../DeleteUserListItem";

const DeleteUserList = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <DeleteUserListItem user={user} key={index} />
      ))}
    </div>
  );
};

DeleteUserList.propTypes = {
  users: PropTypes.array
};

export default DeleteUserList;
