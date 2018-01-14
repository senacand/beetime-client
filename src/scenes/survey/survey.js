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
        }

        this.handleInputChange.bind(this);
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
    
    render(){
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
                <h3>{this.props.match.params.id}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                <hr />
                <h5>Enter your identity below</h5>
                <label for="inputName">Name</label>
                <input type="text" name="name" onChange={this.handleInputChange} className="u-full-width" placeholder="Your full name" value={this.state.name} id="inputName"/>
                <div className="row">
                    <div className="six columns">
                        <label for="inputNIM">NIM</label>
                        <input type="text" name="nim" onChange={this.handleInputChange} className="u-full-width" placeholder="Nomor Induk Mahasiswa (Student ID Number)" value={this.state.nim} id="inputNIM"/>
                    </div>
                    <div className="six columns">
                        <label for="inputProgram">Program</label>
                        <input type="text" name="program" onChange={this.handleInputChange} className="u-full-width" placeholder="Your program (Jurusan)" value={this.state.program} id="inputProgram"/>
                    </div>
                </div>
                <hr />
                <h5>Choose the time where <strong>you have a class schedule</strong>.</h5>
                <div className="row">
                    {dayTable}
                </div>
                <p>Please <strong>double check</strong> and make sure you've checked the right time. After you submit, you cannot modify it.</p>
                <input type="submit" className="button button-primary u-full-width" value="Submit" />
            </div>
        );
    }
}