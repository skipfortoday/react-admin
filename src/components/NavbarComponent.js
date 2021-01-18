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
} from "reactstrap";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="faded" light expand="md">
        <Container>
          <NavbarBrand > L'viors Attandance System ~ </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Pegawai</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Izin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/group">
                  Grup Pegawai
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Admin</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
