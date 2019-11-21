import React from "react";
import PropTypes from "prop-types";

const DeleteUserListItem = ({ user, adminDeleteUser }) => {
  return (
    <div data-test="list-item" className="toggle-list__item">
      <p data-test='user-name' className="toggle-list__item__text">Name: 
        <span className='name'>  {user.name}</span>
      </p>
      <button
        data-test='delete-button'
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
