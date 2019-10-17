import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      date: props.expense ? moment(props.expense.date) : moment(),
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

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      const error = "Please provide a description and amount";
      this.setState(() => ({ error }));
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
    expense: PropTypes.object
  };

  render() {
    return (
      <form data-test="expense-form-component" onSubmit={this.onSubmit}>
        <div data-test="errorMsg-div">
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <div data-test="description">
          <input
            type="text"
            placeholder="Description"
            autoFocus
            autoComplete="off"
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
        </div>
        <div data-test="amount">
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
        </div>
        <div data-test="date-picker">
          <SingleDatePicker
            date={this.state.date}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
        <div data-test="note">
          <textarea
            placeholder="Add a note (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
        </div>
        <div data-test="submit-button">
          <button>Save expense</button>
        </div>
      </form>
    );
  }
}
