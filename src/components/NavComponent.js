import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const handleLogout = () => {
    localStorage.removeItem('token');
}

const ToggleLogout = (props) => {
    console.log("im in the toggleLogout");
    if(props.token) {
        console.log("token exists");
        return (
            <NavItem>
                <NavLink href="/login" onClick={handleLogout}>Logout</NavLink>
            </NavItem>
        )
    }
    else {
        console.log("token doesnt exist");
        return (<div></div>);
    }
}

export const Navigation = (props) => {
    console.log(props.token);
    console.log("im in the nav component");
    return (
        <div className="navbar-text">
            <Navbar className="bg-dark shadow fixed-top">
                <NavbarBrand>Schmucks Admin</NavbarBrand>
                    <Nav className="ml-auto">
                        <ToggleLogout token={props.token} />
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">Reports</NavLink>
                        </NavItem>
                    </Nav>
               
            </Navbar>
        </div>
    )
}