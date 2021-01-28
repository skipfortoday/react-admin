import React, { useState } from "react";
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
                <NavLink href="/">Pegawai</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/izin">Status Absensi</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/group">Group Pegawai</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cabang">Cabang</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Portal Menu
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/create">Tambah Pegawai</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/izin/list">Lengkapi Absensi Perorang</DropdownItem>
                  <DropdownItem href="/izin/group">Lengkapi Absensi Pergroup</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/group/create">Tambah Group Pegawai</DropdownItem>
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
