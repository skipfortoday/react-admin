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
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="faded" light expand="md">
        <Container>
          <NavbarBrand> L'viors Attandance System ~ </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/">
                  <NavLink>Pegawai</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/izin">
                  <NavLink>Status Absensi</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/group">
                  <NavLink>Group Pegawai</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cabang">
                  <NavLink>Cabang</NavLink>
                </Link>
              </NavItem>
            </Nav>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Portal Menu
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
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Admin</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
