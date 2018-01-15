import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            surveys: [],
            loading: true,
        };
    }

    componentDidMount(){
        this.setState({
            loading: true,
        })
        fetch('/api/survey', {
            credentials: 'include',
        })
        .then(res => {
            if(res.status==401){
                window.location = '/login';
            }
            else {
                return res.json();
            }
        })
        .then(res => {
            this.setState({
                loading: false,
                surveys: res,
            });
        })
        .catch(err => {
            alert(err);
        })
    }

    render(){
        if(this.state.loading){
            return(
                <section class="container main-dashboard">
                    <center><img alt="loading" height="10px" src={require('../../loading.svg')} /></center>
                </section>
            )
        }
        var surveyList = [];
        this.state.surveys.forEach(e => {
            surveyList.push(
                <li><Link to={'/'+e['_id']+'/result'}>{e.title}</Link></li>
            )
        });
        return(
            <section class="container main-dashboard">
                <h3>Dashboard</h3>
                <p>Here you can find all the surveys that you have created. Select a survey to see the result of the survey.</p>
                <ul className="survey-list">
                    {surveyList}
                </ul>
            </section>
        )
    }
}