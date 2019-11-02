import React from "react";
import PropTypes from "prop-types";

const DeleteUserListItem = ({ user, adminDeleteUser }) => {
  return (
    <div className="toggle-list__item">
      <p className="toggle-list__item__text">Name: {user.name}</p>
      <button
        className="toggle-list__item__button"
        onClick={() => adminDeleteUser(user._id)}
      >
        Delete this user
      </button>
    </div>
  );
};

DeleteUserListItem.propTypes = {
  user: PropTypes.object,
  adminDeleteUser: PropTypes.func
};

export default DeleteUserListItem;
