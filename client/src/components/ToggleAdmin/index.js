import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ToggleAdmin extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <div>ToggleAdmin form here</div>;
  }
}

// create a fetch all user names (and emails) action/reducer/route etc?
// could then display a list of users for admin to select from !
