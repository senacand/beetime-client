import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './components/mainheader';

export default class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="main-home">
                <MainHeader />
                <div className="container">
                    <article className="main">
                        <header>Create Schedule Survey</header>
                        <p>
                            Finding the right time to organize a meeting, training, or hangout with other Binusian is not easy. Everyone has different schedule. BeeTime is here to make it easier.
                        </p>

                        <p>
                            With BeeTime, you can acquire the class schedules of all members of your group or organization by giving them an easy to use form to select.
                        </p>

                        <Link to='/register' className="button button-primary">Get Started</Link>
                    </article>
                    <article className="main">
                        <header>Made by Binusian, for Binusian</header>
                        <p>
                            We are also Binusian who have this same problem. We created this service to help us and other Binusian to solve the problem quick and easily.
                        </p>
                    </article>
                    <article className="main">
                        <header>Tutorial</header>
                        <video src="http://techslides.com/demos/sample-videos/small.mp4" className="u-max-full-width" controls />
                    </article>
                    <article className="content">
                        <header>Frequently Asked Questions</header>
                        <p>
                            <strong>Is it free?</strong><br/>
                            Yes, of course it is.
                        </p>
                        <p>
                            <strong>How does it work?</strong><br/>
                            This site allows you to create a simple poll that allows Binusian to choose their class schedule.
                        </p>
                        <p>
                            <strong>Can I use your API?</strong><br/>
                            Although there's no public API yet, but <strong>yes</strong>, if you can find it you are free to use it. <br/>We encourage developers, especially Binusian developers, to develop a unique and useful app using our service.
                        </p>
                        <p>
                            <strong>How do I get started?</strong><br/>
                            Just click the button below 😀
                        </p>
                        <Link to='/register' className="button button-primary">Get Started</Link>
                    </article>
                </div>
            </div>
        );
    }
}