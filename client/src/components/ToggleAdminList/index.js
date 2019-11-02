import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ToggleAdminListItem from "../ToggleAdminListItem";
import "./styles.scss";

const ToggleAdminList = ({ users, successMsg, errorMsg }) => {
  return (
    <div className="adminList">
      <h2 className="adminList__header">Current status</h2>
      <div className="adminList__message-container">
        {(successMsg || errorMsg) && (
          <p className="adminList__message">{successMsg || errorMsg}</p>
        )}
      </div>
      <div>
        {users.map((user, index) => (
          <ToggleAdminListItem user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

ToggleAdminList.propTypes = {
  users: PropTypes.array,
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = state => ({
  successMsg: state.user.adminStatusMsg,
  errorMsg: state.user.error
});

export default connect(mapStateToProps)(ToggleAdminList);
