import React, { Component } from 'react';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './styles.css';
import Home from './scenes/home/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <header className="nav-header">
            <div className="container nav-container">
              <div className="logo">
                <Link to="/"><span className="logo">🐝 BeeTime</span></Link>
              </div>
              <nav className="nav-menu">
              <Link to='/login' className="button button-white" style={{
                fontSize: '1em',
              }}>Login</Link>
              </nav>
            </div>
          </header>
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact render={props => (<h1>Start Registration</h1>)} />
                <Route path="/:id" component={start} />
              </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

const start = ({match}) => (
  <h1>{match.params.id}</h1>
)

export default App;
