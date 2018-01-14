import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './styles.css';
import Home from './scenes/home/home';
import Create from './scenes/create/create';
import Survey from './scenes/survey/survey';
import Login from './scenes/login/login';
import Header from './components/header/header';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      loadingUser: false,
    }
  }

  componentDidMount(){
    this.checkUserSession();
    setInterval(this.checkUserSession, 1000*60);
  }

  checkUserSession = () => {
    this.setState({
      loadingUser: true,
    })
    fetch('/api/user', {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        user: res,
        loadingUser: false,
      });
    })
    .catch(err => {
      alert("Whoops... Something is off with the server.\nSome stuff may not load correctly.\n\nPlease try refreshing the page.");
    })
  }

  render() {
    return (
      <BrowserRouter>
        <section className="app">
          <Header user={this.state.user} loading={this.state.loadingUser} />
          <section id="content-body">
            <Switch>
              <Route path="/" exact component={Home} title="Home" />
              <Route path="/register" exact render={props => (<h1>Start Registration</h1>)}/>
              <Route path="/create" exact component={Create} />
              <Route path="/login" exact component={Login} />
              <Route path="/:id" component={Survey} title="Survey" />
            </Switch>
          </section>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
