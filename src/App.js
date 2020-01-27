import React, { Component } from "react";
import Counters from "./features/components/counters";
import "./App.css";
import NavBar from "./features/components/navBar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 5 },
      { id: 3, value: 6 }
    ]
  };

  componentDidUpdate(prevProps, prevState) {
    //console.log("prevState = ", prevState);
    //console.log("this.stateActuell = ", this.state);
  }

  handleDelete = id => {
    const counters = this.state.counters.filter(c => c.id !== id);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => ({
      ...c,
      value: 0
    }));
    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = this.state.counters.map(c => {
      if (c.id === counter.id) {
        c.value = c.value + 1;
      }
      return c;
    });
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = this.state.counters.map(c => {
      if (c.id === counter.id && c.value > 0) {
        c.value = c.value - 1;
      }
      return c;
    });
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          numberOfCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            handleIncrement={this.handleIncrement}
            handleDelete={this.handleDelete}
            handleReset={this.handleReset}
            handleDecrement={this.handleDecrement}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
