import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const handleLogout = () => {
    localStorage.removeItem('token');
}

const ToggleLogout = (props) => {
    if(props.token) {
        return (
            <Nav className="ml-auto">
                <NavItem>
                    <NavLink href="/login" onClick={handleLogout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Reports</NavLink>
                </NavItem>
            </Nav>
        )
    }
    else {
        return (<div></div>);
    }
}

export const Navigation = (props) => {
    return (
        <div className="navbar-text">
            <Navbar className="bg-dark shadow fixed-top">
                <NavbarBrand>Schmucks Admin</NavbarBrand>
                <ToggleLogout token={props.token} />
            </Navbar>
        </div>
    )
}