import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ToggleAdminListItem from "../ToggleAdminListItem";
import "./styles.scss";

export const ToggleAdminList = ({ users, successMsg, errorMsg }) => {
  return (
    <div data-test='admin-list' className="adminList">
      <h2 data-test='header' className="adminList__header">Current status</h2>
      <div data-test='message-container' className="adminList__message-container">
        {(successMsg || errorMsg) && (
          <p data-test='message' className="adminList__message">{successMsg || errorMsg}</p>
        )}
      </div>
      <div data-test='list-items'>
        {users.map((user, index) => (
          <ToggleAdminListItem data-test='list-item' user={user} key={index} />
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
