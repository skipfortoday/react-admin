import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      
      <Navbar color="dark" dark expand="md">
      <img src="/logodarkgold.jpeg" alt="logodarkgold"/>
          <NavbarBrand> </NavbarBrand>
          <NavbarBrand> L'viors Attendance System</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" navbar>
                 <NavItem>
                <Link to="/absensimanual">
                <NavLink>Absensi Manual </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <a href={"/laporanguest"}>
                <NavLink> Laporan</NavLink>
                </a>
              </NavItem>
            </Nav>
            <Nav navbar> 
            <NavItem>
                <Link to="/Login">
                <NavLink> Login</NavLink>
                </Link>
              </NavItem>
            </Nav>  
          </Collapse>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
