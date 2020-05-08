import React, { Component } from "react";
import "./App.css";
import CardPointeTokenizer from "./components/CardPointeTokenizer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userAccessRole: "",
    };
  }
  render() {
    return (
      <div className="App">
        <CardPointeTokenizer />
      </div>
    );
  }
}

export default App;
