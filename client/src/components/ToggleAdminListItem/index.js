import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleAdmin } from "../../actions/user/user";
import "./styles.scss";

export const ToggleAdminListItem = ({ user, toggleAdmin }) => {
  return (
    <div>
      {user.isAdmin ? (
        <div data-test='admin-list-item' className="toggle-list__item">
          <div data-test='user-info' className="toggle-list__item__text">
            <p>User: <span className='name'>{' '}{user.name}</span></p> 
            <p>Admin Access: <span className='isAdmin'>{' '}Yes</span></p>
          </div>
          <button
            data-test='toggle-button'
            className="toggle-list__item__button"
            onClick={() => toggleAdmin({ email: user.email })}
          >
            Toggle access
          </button>
        </div>
      ) : (
        <div data-test='admin-list-item' className="toggle-list__item">
          <div data-test='user-info'  className="toggle-list__item__text">
            <p>User: <span className='name'>{' '}{user.name}</span></p>
            <p>Admin Access: <span className='nonAdmin'>{' '}No</span></p>
          </div>
          <button
            data-test='toggle-button'
            className="toggle-list__item__button"
            onClick={() => toggleAdmin({ email: user.email })}
          >
            Toggle access
          </button>
        </div>
      )}
    </div>
  );
};

ToggleAdminListItem.propTypes = {
  user: PropTypes.object,
  toggleAdmin: PropTypes.func
};

export default connect(
  null,
  { toggleAdmin }
)(ToggleAdminListItem);
