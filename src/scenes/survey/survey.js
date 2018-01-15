import React, { Component } from 'react';
import './styles.css';

const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeName = ['07:20', '09:20', '11:20', '13:20', '15:20', '17:20', '19:20'];

export default class Survey extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            schedule: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
            name: '',
            program: '',
            nim: '',
            loading: true,
            title: '',
            description: '',
            owner: '',
        }

        this.handleInputChange.bind(this);
        this.handleInputSubmit.bind(this);
    }

    handleClick = (i, j) => {
        var newState = this.state.schedule.slice();
        newState[i][j] = newState[i][j]^1;
        this.setState({
            schedule: newState,
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        if(name==='nim'){
            if(!/^[0-9]*$/.test(value)){
                this.setState({
                    nim: this.state.nim,
                });
                return;
            }
        }
        this.setState({
            [name]: value,
        });
    }

    handleInputSubmit = (event) => {
        const body = JSON.stringify({
            name: this.state.name,
            nim: this.state.nim,
            program: this.state.program,
            schedule: this.state.schedule,
        });
        if(window.confirm("Are you sure you want to submit?\n\nYou cannot modify your answer after submitting. Make sure you've entered the right information.")){
            fetch('/api/survey/'+this.props.match.params.id, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body,
                credentials: 'include',
            })
            .then(res => {
                if(res.status==404){
                    alert("Can't find survey. Seems like the survey has been removed.");
                    window.location = '/';
                }
                else {
                    return res.json();
                }
            })
            .then(res => {
                if(res.success){
                    alert('Your answer has been successfully submitted. Thank you.');
                    window.location = '/'+this.props.match.params.id+'/result';
                }
            })
            .catch(err => {
                alert('An error has occured. Please try again later.');
            })
        }
        event.preventDefault();
    }

    componentDidMount = () => {
        this.setState({
            loading: true,
        });
        fetch("/api/survey/"+this.props.match.params.id, {
            credentials: 'include',
        })
        .then(res => {
            if(res.status==404){
                alert('Survey not found. \nYou may have visited the wrong link or the survey has been deleted.');
                window.location = '/';
                return null;
            }
            else {
                return res.json();
            }
        })
        .then(res => {
            if(res)
                this.setState({
                    loading: false,
                    title: res.title,
                    description: res.description,
                })
        })
        .catch(err => {
            console.log(err);
            alert('Unable to connect to the server. Please try again later.');
            window.location = '/';
        })
    }
    
    render(){
        if(this.state.loading){
            return(
                <div className="container main-survey"><center><img alt="loading" src={require('../../loading.svg')} height="10px" /></center></div>
            );
        }
        var dayTable = [];

        for(let i=0; i<6; i++){
            let currDay = [];
            currDay.push(<h6>{dayName[i]}</h6>);
            for(let j=0; j<7; j++){
                const className = (this.state.schedule[i][j])?'button button-red u-full-width':'button u-full-width';
                currDay.push(
                    <button onClick={() => this.handleClick(i, j)} className={className}>
                        {timeName[j]}
                    </button> );
            }
            dayTable.push(
                <div className="two columns survey-column">
                    {currDay}
                </div>
            );
        }

        return(
            <div className="container main-survey">
                <h3>{this.state.title}</h3>
                <p>{this.state.description}</p>
                <hr />
                <h5>Choose the time when <strong>you have a class schedule</strong>.</h5>
                <div className="row">
                    {dayTable}
                </div>
                <hr />
                <h5>Enter your identity below</h5>
                <form onSubmit={this.handleInputSubmit}>
                    <label for="inputName">Name</label>
                    <input type="text" name="name" onChange={this.handleInputChange} className="u-full-width" placeholder="Your full name" value={this.state.name} id="inputName" required/>
                    <div className="row">
                        <div className="six columns">
                            <label for="inputNIM">NIM</label>
                            <input type="text" name="nim" onChange={this.handleInputChange} className="u-full-width" placeholder="Nomor Induk Mahasiswa (Student ID Number)" value={this.state.nim} id="inputNIM" required/>
                        </div>
                        <div className="six columns">
                            <label for="inputProgram">Program</label>
                            <input type="text" name="program" onChange={this.handleInputChange} className="u-full-width" placeholder="Your program (Jurusan)" value={this.state.program} id="inputProgram" required/>
                        </div>
                    </div>
                    <p>Please <strong>double check</strong> and make sure you've checked the right time. After you submit, you cannot modify it.</p>
                    <input type="submit" className="button button-primary u-full-width" value="Submit" />
                </form>
            </div>
        );
    }
}