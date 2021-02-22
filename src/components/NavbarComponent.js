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
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonDropdown,
  Alert,
  Card,
} from "reactstrap";

const NavbarComponent = (props) => {
  const [dropdownOpen, isOpen] = useState(false);

  const toggle = () => isOpen(!dropdownOpen);
  

  return (
    <div>
      
      <Navbar color="faded" light expand="md">
          <Card body inverse color="warning">
          <NavbarBrand> L'viors Attandance System ~ </NavbarBrand>
          </Card>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          <Card body inverse color="info">
            <Nav className="mr-auto" navbar>
           
              <NavItem>    
                <Link to="/">
                <NavbarBrand>Pegawai |</NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
              <a href={"/izin"}>
                <NavbarBrand>Status Absensi |</NavbarBrand>
               </a>
              </NavItem>
              <NavItem>
                <Link to="/group">
                <NavbarBrand> Group Pegawai |</NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                <NavbarBrand> Cabang |</NavbarBrand>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/laporan">
                <NavbarBrand> Laporan</NavbarBrand>
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
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="info">
                    Portal
                  </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/create">
                    <DropdownItem>Tambah Pegawai</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <a href={"/izin"}>
                    <DropdownItem>Lengkapi Absensi Perorang</DropdownItem>
                  </a>
                  <Link to="/izin/group">
                    <DropdownItem>Lengkapi Absensi Pergroup</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <Link to="/group/create">
                    <DropdownItem>Tambah Group Pegawai</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <Link to="/group/create">
                    <DropdownItem>Tambah Cabang</DropdownItem>
                  </Link>
                </DropdownMenu>
                </ButtonDropdown>
              </UncontrolledDropdown>
            </Nav>
            
            <NavbarText>as</NavbarText><NavbarBrand> Admin</NavbarBrand>
            
          </Collapse>
      </Navbar>

    </div>
  );
};

export default NavbarComponent;
