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
import LogoutComponent from "./LogoutComponent";

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  var nama = localStorage.getItem('user');

  return (
    <div>
      
      <Navbar color="dark" dark expand="md">
          <NavbarBrand> L'viors AttSystem ~ </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/laporan">
                <NavbarBrand>| Laporan |</NavbarBrand>
                </Link>
              </NavItem>   
            </Nav>
            <Nav navbar> 
            </Nav>  

          <a href={"/login"}>
           <LogoutComponent/>
          </a>
          </Collapse>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
