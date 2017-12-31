import React, { Component } from 'react';
import './styles.css';

export default class Create extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
        }

        this.handleInputChange.bind(this);
        this.handleInputSubmit.bind(this);
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
        alert(
            "Title: \n" + this.state.title + "\n\n" +
            "Description: \n" + this.state.description
        );
        event.preventDefault();
    }
    
    render(){
        return(
            <div className="container main-create">
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
                        onChange={this.handleInputChange} />
                    <label for="descriptionInput">Description</label>
                    <textarea 
                        id="descriptionInput" 
                        name="description" 
                        placeholder="Description of the Survey" 
                        className="u-full-width"
                        onChange={this.handleInputChange}>
                        {this.state.description}
                    </textarea>
                    <input type="submit" value="Create" className="button button-primary" />
                </form>
            </div>
        );
    }
}