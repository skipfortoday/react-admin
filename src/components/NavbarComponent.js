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
} from "reactstrap";

const NavbarComponent = (props) => {
  const [dropdownOpen, isOpen] = useState(false);

  const toggle = () => isOpen(!dropdownOpen);
  

  return (
    <div>
      <Navbar color="faded" light expand="md">
          <NavbarBrand> L'viors Attandance System ~ </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/">
                <Button color="info"> Pegawai</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/izin">
                <Button color="info">Status Absensi</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/group">
                <Button color="info">Group Pegawai</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                <Button color="info">Cabang</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/laporan">
                <Button color="info"> Laporan</Button>
                </Link>
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
                  <Link to="/izin/list">
                    <DropdownItem>Lengkapi Absensi Perorang</DropdownItem>
                  </Link>
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
