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
          <NavbarBrand href="/">L'viors</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Izin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/jamkerja">
                  Jam Kerja
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Grup Pegawai
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  Penggajian
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
