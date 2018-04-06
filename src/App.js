import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  valueChanged(e) {
    let state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit() {
    alert("Login button clicked");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-intro">
          <form>
            <input type="text" name="email" value={this.state.email} onChange={e => this.valueChanged(e)} />
            <input type="password" name="password" value={this.state.password}  onChange={e => this.valueChanged(e)} />
            <input type="submit" value="Login" onClick={this.onSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
