import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Card,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = (props) => {
  const [dropdownOpen, isOpen] = useState(false);

  const toggle = () => isOpen(!dropdownOpen);
  var nama = localStorage.getItem('user');

  return (
    <div>
      
      <Navbar color="faded" light expand="md">
          <Card body inverse color="warning">
          <NavbarBrand> L'viors AttSystem ~ </NavbarBrand>
          </Card>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          <Card body inverse color="info">
            <Nav className="mr-auto" navbar>
           
              <NavItem>    
                <Link to="/">
                <NavbarBrand>Pegawai</NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
              <a href={"/izin"}>
                <NavbarBrand>|  Status Absensi</NavbarBrand>
               </a>
              </NavItem>
              <NavItem>
                <Link to="/group">
                <NavbarBrand>|  Group Pegawai  </NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                <NavbarBrand>| Cabang</NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/laporan">
                <NavbarBrand>| Laporan</NavbarBrand>
                </Link>
              </NavItem>   
            </Nav>
            </Card>
            <Nav navbar> 
            <NavItem>

            <NavItem>
                
                <NavbarBrand> </NavbarBrand>
        
              </NavItem>   
            </NavItem>
            </Nav>  
          </Collapse>
          <a href={"/login"}>
            <Button color="warning">{nama} <FontAwesomeIcon icon={faSignOutAlt}/></Button>
          </a>
      </Navbar>
      

    </div>
  );
};

export default NavbarComponent;
