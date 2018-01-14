import React, { Component } from 'react';
import './styles.css';

export default class Create extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            loading: true,
        }

        this.handleInputChange.bind(this);
        this.handleInputSubmit.bind(this);
    }

    checkUserSession = () => {
        this.setState({
          loading: true,
        })
        fetch('/api/user', {
          credentials: 'include'
        })
        .then((res) => res.json())
        .then((res) => {
          if(res==null||res['_id']==null){
              window.location = '/login';
          }
          else {
              this.setState({
                  loading: false,
              })
          }
        })
        .catch(err => {
          alert("Whoops... Something is off with the server.\nSome stuff may not load correctly.\n\nPlease try refreshing the page.");
        })
      }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleInputSubmit = (event) => {
        const body = JSON.stringify({title: this.state.title, description: this.state.description});
        fetch('/api/survey', {
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
            if(res['error']){
                alert(res['error']);
            }
            else if(res&&res['_id']){
                const dest = '/'+res['_id'];
                window.location = dest;
            }
            else {
                alert('Something is off with the server\nPlease try again...');
            }
        })
        .catch(err => {

        })
        event.preventDefault();
    }

    componentDidMount(){
        this.setState({
            loading: true,
        })
        this.checkUserSession();
    }
    
    render(){
        if(this.state.loading){
            return(
                <section className="container main-create">
                    <center><img src={require('../../loading.svg')} height="10px" alt="loading" /></center>
                </section>
            )
        }
        return(
            <section className="container main-create">
                <h3>Create New Survey</h3>
                <form onSubmit={this.handleInputSubmit}>
                    <label for="titleInput">Title</label>
                    <input 
                        className="u-full-width" 
                        placeholder="Title of the Survey" 
                        id="titleInput" 
                        type="text" 
                        name="title" 
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        required />
                    <label for="descriptionInput">Description</label>
                    <textarea 
                        id="descriptionInput" 
                        name="description" 
                        placeholder="Description of the Survey" 
                        className="u-full-width"
                        onChange={this.handleInputChange}
                        value={this.state.description}
                        required />
                    <input type="submit" value="Create" className="button button-primary" />
                </form>
            </section>
        );
    }
}