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
      <img src="/logodarkgold.jpeg" alt="logodarkgold"/>
          <NavbarBrand> </NavbarBrand>
          <NavbarBrand> L'viors Attendance System ~ </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>    
                <Link to="/">
                <NavLink> Pegawai </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <a href={"/izin"}>
                <NavLink>Status Absensi </NavLink>
               </a>
              </NavItem>
              <NavItem>
                <Link to="/group">
                <NavLink> Group </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                <NavLink>Cabang </NavLink>
                </Link>
              </NavItem>
              <NavItem>
              <a href={"/laporan"}>
                <NavLink> Laporan </NavLink>
               </a>
              </NavItem>   
            </Nav>
            <Nav navbar> 
            <NavItem>
            <NavItem>
                
                <NavbarBrand> {nama}</NavbarBrand>
        
              </NavItem>   
            </NavItem>
            </Nav>  

          <a href={"/home"}>
           <LogoutComponent/>
          </a>
          </Collapse>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
