import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { BrowserRouter,     NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png'

const NavbarComponent = () => {
    return (
        <div>
        <BrowserRouter>
            <Navbar bg="info" variant="dark">
                <Navbar.Brand className="ml-4"><img src={logo} height={30}/></Navbar.Brand>
                <Nav className="ml-auto mr-4">
                    <Nav.Link className="nav-link" activeClassName="active" exact
                    href="/book">My Book</Nav.Link>
                </Nav>
            </Navbar>
        </BrowserRouter>
        </div>
    )
}

export default NavbarComponent
