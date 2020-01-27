import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-secondary btn-sm m-2"
          onClick={this.props.handleReset}
        >
          Reset
        </button>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            id={counter.id}
            value={counter.value}
            handleDelete={this.props.handleDelete}
            handleIncrement={() => this.props.handleIncrement(counter)}
            handleDecrement={() => this.props.handleDecrement(counter)}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
