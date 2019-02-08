import React, { Component } from 'react';

function User({name}) {
    return (
        <div>
            <h4>Hello {name}</h4>
        </div>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <User user={props.User} />
            </div>
        </div>
    );
}

export default Home;