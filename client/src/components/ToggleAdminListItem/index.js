import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleAdmin } from "../../actions/user/user";

const ToggleAdminListItem = ({ user, toggleAdmin }) => {
  return (
    <div>
      {user.isAdmin ? (
        <div>
          <p>Name: {user.name}, Admin Access: Yes</p>
          <button onClick={() => toggleAdmin({ email: user.email })}>
            Toggle Admin access for user
          </button>
        </div>
      ) : (
        <div>
          <p>Name: {user.name}, Admin Access: No</p>
          <button onClick={() => toggleAdmin({ email: user.email })}>
            Toggle Admin access for user
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
