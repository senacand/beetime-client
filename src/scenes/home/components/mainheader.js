import React, { Component } from 'react';
import '../styles.css';

export default class MainHeader extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <header className="main-header" style={{
              backgroundImage: `url(${require('../../../images/meeting.jpg')})`,
              backgroundPosition: '0, 0',
            }}>
                <div className="container">
                    <h1><strong>BeeTime</strong></h1>
                    <h4>Find the right time with other Binusian, easily.</h4>
                </div>
            </header>
        );
    }
}