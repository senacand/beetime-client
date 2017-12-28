import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <Route path="/" exact component={home} />
            <Route path="/s/:id" component={test}/>
          </p>
        </div>
      </BrowserRouter>
    );
  }
}

const test = ({ match }) => (
  <div>
    {match.params.id}
  </div>
);

const home = () => (
  <div>
    <code>/s/:id</code>
  </div>
)

export default App;
