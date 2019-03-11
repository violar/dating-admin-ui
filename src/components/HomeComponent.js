import React, { Component } from 'react';
import { Redirect } from 'react-router';

function User({user}) {
    console.log("inside home user");
    return (
        <div>
            <h4>Hello {user.name}</h4>
        </div>
    );
}

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        console.log("inside home render");
        console.log(this.props.loggedUser[0]);

        if(this.props.loggedUser.length === 0) {
            return <Redirect to="/login" />
        }

        return (
            <div className="container">
                <div className="row">
                    <User user={this.props.loggedUser[0]} />
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            </div>
        );
    }
}




export default Home;