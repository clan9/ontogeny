import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "./styles.scss";

export default class RecordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.record ? props.record.description : "",
      note: props.record ? props.record.note : "",
      amount: props.record ? (props.record.amount / 100).toString() : "",
      date: props.record ? moment(props.record.date) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = date => {
    if (date) {
      this.setState(() => ({ date }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  resetErrorMsg = () => {
    setTimeout(() => {
      this.setState(() => ({ error: "" }));
    }, 5000);
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      const error = "Please provide a description and amount";
      this.setState(() => ({ error }));
      this.resetErrorMsg();
    } else {
      const error = "";
      this.setState(() => ({ error }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        date: this.state.date.valueOf(),
        note: this.state.note
      });
    }
  };

  static propTypes = {
    expense: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  render() {
    return !this.props.isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <form
        data-test="record-form-component"
        onSubmit={this.onSubmit}
        className="record-form"
      >
        <div data-test="errorMsg-div" className="record-form__error-container">
          {this.state.error && (
            <p className="record-form__errorMsg">{this.state.error}</p>
          )}
        </div>
        <input
          type="text"
          className="record-form__field"
          data-test="description"
          placeholder="Description"
          autoFocus
          autoComplete="off"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          className="record-form__field"
          data-test="amount"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.date}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          displayFormat={() => "DD/MM/YYYY"}
        />
        <textarea
          className="record-form__field record-form__field--textarea"
          data-test="note"
          placeholder="Add a note (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <button className="record-form__button" data-test="submit-button">
          Save
        </button>
      </form>
    );
  }
}
