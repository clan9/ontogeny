import React from "react";
import PropTypes from "prop-types";
import ToggleAdminListItem from "../ToggleAdminListItem";

const ToggleAdminList = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <ToggleAdminListItem user={user} key={index} />
      ))}
    </div>
  );
};

ToggleAdminList.propTypes = {
  users: PropTypes.array
};

export default ToggleAdminList;
