import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">Hello, React.js</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href="/tasks">Tasks</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link href="/token">Token</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;