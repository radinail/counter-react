import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <span>{this.props.value}</span>
        <button
          onClick={this.props.handleIncrement}
          className="btn btn-secondary btn-sm m-2"
        >
          +
        </button>
        <button
          onClick={this.props.handleDecrement}
          className="btn btn-secondary btn-sm m-2"
        >
          -
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.handleDelete(this.props.id)}
        >
          x
        </button>
      </div>
    );
  }
}

export default Counter;
