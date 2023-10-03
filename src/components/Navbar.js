import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


const NavbarComponent = () => {
    const [isDarkBackground, setIsDarkBackground] = React.useState(
        localStorage.getItem('isDarkBackground') === 'true' ? true : false
    );

    const toggleBackground = () => {
        const newMode = !isDarkBackground;
        setIsDarkBackground(newMode);
        localStorage.setItem('isDarkBackground', newMode);
    };

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkBackground);
    }, [isDarkBackground]);

    return (
        <>
            <Navbar expand="lg" className={`main-navbar bg-body-tertiary sticky-lg-top ${isDarkBackground ? 'dark-mode' : 'light-mode'}`}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Brand><Link className='navbar-brand-link' to='/'>
                                {/* <img src={logo} className='e-learn-logo' alt="logo" /> */}
                                E-Learn</Link>
                            </Navbar.Brand>
                            <Nav.Link className='navbar-link'><Link className='nav-link' to='/'>Home</Link></Nav.Link>
                            <Nav.Link className='navbar-link'><Link className='nav-link' to='/'>About Us</Link></Nav.Link>
                            <NavDropdown className='navbar-link-dropdown' title="Courses" id="basic-nav-dropdown" >
                                <div >
                                    <NavDropdown.Item href="#action/3.1" className='nav-dropdown-item'>
                                        <Link className='navbar-action-link' to='/'>All Courses</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2" className='nav-dropdown-item'>Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.3" className='nav-dropdown-item'>
                                        Separated link
                                    </NavDropdown.Item>
                                </div>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Brand>
                        <div >
                            <FormControlLabel
                                control={<Switch checked={isDarkBackground} onChange={toggleBackground} />}
                                label={
                                    isDarkBackground ? (
                                        <span style={{ color: 'white' }}>Dark Mode</span>
                                    ) : (
                                        <span style={{ color: 'black' }}>Light Mode</span>
                                    )
                                }
                            />
                        </div>
                    </Navbar.Brand>
                    {/* {user ? (
                        <Button className='navbar-btn navbar-user-dropdown'>
                            <Navbar.Brand className='navbar-user-dropdown'>
                                <NavDropdown
                                    className='navbar-user-dropdown-items'
                                    title={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    id="user-dropdown"
                                >
                                    <NavDropdown.Item className='nav-dropdown-item'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item className='nav-dropdown-item' onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Brand>
                        </Button>

                    ) : (
                        <Navbar.Brand><Link to='/Index'><Button className='navbar-btn'>LogIn/SignUp</Button></Link></Navbar.Brand>
                    )} */}
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;