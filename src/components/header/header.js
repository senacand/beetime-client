import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Header extends Component { 
    render(){
        console.log(this.props.user);
        var loginMenu = <nav className="nav-menu"><img src={require('./loading.svg')} width="30px" height="30px" alt="loading" /></nav>;
        if(!this.props.loading){
            const user = this.props.user;
            if(user != null && user['_id'] != null){
                loginMenu = (<nav className="nav-menu">
                                <Link to='/dashboard' className="button button-dashboard" style={{
                                    fontSize: '1em',
                                    marginBottom: '0px',
                                    color: '#ffffff',
                                }}>Dashboard</Link>
                            </nav>);
            }
            else {
                loginMenu = (<nav className="nav-menu">
                                <Link to='/login' className="button button-white" style={{
                                    fontSize: '1em',
                                }}>Login</Link>
                            </nav>);
            }
        }
        return (
        <header className="nav-header">
            <div className="container nav-container">
              <section className="logo">
                <Link to="/"><span className="logo"><img src={require('../../images/logo.png')} alt="logo" height="24px" /> BeeTime</span></Link>
              </section>
              {loginMenu}
            </div>
        </header>
        )
    }
}