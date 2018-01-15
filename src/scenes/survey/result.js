import React, { Component } from 'react';
import './styles.css';

const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeName = ['07:20', '09:20', '11:20', '13:20', '15:20', '17:20', '19:20'];

export default class SurveyResult extends Component {

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
            title: '',
            maxSchedule: 1,
        }
    }

    componentDidMount(){
        fetch('/api/survey/'+this.props.match.params.id+'?includeAnswers=true', {
            credentials: 'include',
        })
        .then(res => {
            if(res.status==404){
                alert('Unable to find survey. Seems like the survey has been removed.');
                // window.location = '/';
                return null;
            }
            else {
                return res.json();
            }
        })
        .then(res => {
            var schedule = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ];
            if(res){
                res.answers.forEach(element => {
                    const aSchedule = element.schedule;
                    for(let i=0; i<6; i++){
                        for(let j=0; j<7; j++){
                            if(aSchedule[i][j])
                                schedule[i][j]++;
                        }
                    }
                });
                var maxSchedule = 1;
                for(let i=0; i<6; i++){
                    for(let j=0; j<6; j++){
                        maxSchedule = Math.max(maxSchedule, schedule[i][j]);
                    }
                }
                this.setState({
                    schedule,
                    title: res.title,
                    maxSchedule,
                })
            };
        })
        .catch(err => {
            console.log(err);
            alert('Something is wrong with the server. Please try again later.');
        })
    }

    render(){
        var dayTable = [];
        for(let i=0; i<6; i++){
            let currDay = [];
            currDay.push(<h6>{dayName[i]}</h6>);
            for(let j=0; j<7; j++){
                var color = [0, 0, 0];
                color[0] = Math.floor((this.state.schedule[i][j]/this.state.maxSchedule) * 255.0);
                color[1] = Math.floor(255.0 - (this.state.schedule[i][j]/this.state.maxSchedule * 255.0));
                if(this.state.schedule[i][j]==0){
                    color[0] = 255;
                    color[1] = 255;
                    color[2] = 255;
                }
                const textColor = (this.state.schedule[i][j]/this.state.maxSchedule>=0.5)?255:0;
                currDay.push(
                    <div className="schedule-box" style={{
                                                            backgroundColor: 'rgb('+color[0]+', '+color[1]+', '+color[2]+')', 
                                                            color: 'rgb('+textColor+','+textColor+','+textColor+')'}}>
                        <b>{timeName[j]} ({this.state.schedule[i][j]})</b>
                    </div> );
            }
            dayTable.push(
                <div className="two columns survey-column">
                    {currDay}
                </div>
            );
        }
        return(
            <section className="container main-survey">
                <h3>{this.state.title}</h3>
                Link to survey:
                <input type="text" value={"https://beetime.senacand.com/"+this.props.match.params.id} className="u-full-width" />
                <p>Below is shown the number of people who have a class schedule on each time.</p>
                <section className="row">
                    {dayTable}
                </section>
            </section>
        );
    }
}