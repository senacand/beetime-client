import React, { Component } from 'react';
import './styles.css';

export default class Login extends Component {

    constructor(props){
        super(props);
        this.handleInputChange.bind(this);

        this.state = {
            email: "",
            password: "",
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleInputSubmit = (event) => {

        const body = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });

        fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body,
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                alert(res.error);
            }
            else {
                window.location="/";
            }
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }

    render(){
        return (
            <section className="container main-login">
                <h3>Login</h3>
                <form onSubmit={this.handleInputSubmit}>
                    <label for="emailInput">E-mail</label>
                    <input 
                        className="u-full-width" 
                        placeholder="email@domain.com" 
                        id="emailInput" 
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                    <label for="passwordInput">Password</label>
                    <input 
                        className="u-full-width" 
                        placeholder="●●●●●●●●●●" 
                        id="passwordInput" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <input type="submit" value="Login" className="button button-primary" />
                </form>
            </section>
        )
    }
}