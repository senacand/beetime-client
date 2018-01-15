import React, { Component } from 'react';
import './styles.css';

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            retryPassword: '',
            fullname: '',
        }
        this.handleInputChange.bind(this);
        this.handleInputSubmit.bind(this);
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
            fullname: this.state.fullname,
        });

        if(this.state.password != this.state.retryPassword){
            alert("Both password fields must be the same");
            event.preventDefault();
            return;
        }

        fetch('/api/user', {
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
                alert('Registration success. You may now login.');
                window.location="/login";
            }
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <section className="container main-login">
                <h3>Register</h3>
                <form onSubmit={this.handleInputSubmit}>
                    <label for="nameInput">Full Name</label>
                    <input 
                        className="u-full-width" 
                        placeholder="Your name" 
                        id="nameInput" 
                        type="text" 
                        name="fullname" 
                        value={this.state.fullname}
                        onChange={this.handleInputChange}
                        required />
                    <label for="emailInput">E-mail</label>
                    <input 
                        className="u-full-width" 
                        placeholder="email@domain.com" 
                        id="emailInput" 
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required />
                    <label for="passwordInput">Password</label>
                    <input 
                        className="u-full-width" 
                        placeholder="●●●●●●●●●●" 
                        id="passwordInput" 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required />
                    <label for="passwordInput">Retype Password</label>
                    <input 
                        className="u-full-width" 
                        placeholder="●●●●●●●●●●" 
                        id="passwordInput" 
                        type="password" 
                        name="retryPassword" 
                        value={this.state.retryPassword}
                        onChange={this.handleInputChange}
                        required />
                    <input type="submit" value="Register" className="button button-primary" />
                </form>
            </section>
        );
    }
}