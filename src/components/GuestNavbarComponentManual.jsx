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
import { siteConfig } from "../config";
const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>

      <Navbar color="dark" dark expand="md">
        <img src="/logodarkgold.jpeg" alt="logodarkgold" />
        <NavbarBrand> </NavbarBrand>
        <NavbarBrand> L'viors Attendance System</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <a href={"/absensimanual"}>
                <NavLink>Masuk </NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/absensimanualpulang"}>
                <NavLink> Pulang</NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/absensimanualistirahatkeluar"}>
                <NavLink> Istirahat Keluar</NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/absensimanualistirahatkembali"}>
                <NavLink> Istirahat Kembali</NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/absensimanualkeluarkantor"}>
                <NavLink> Keluar Kantor</NavLink>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/absensimanualkembalikantor"}>
                <NavLink> Kembali Kantor</NavLink>
              </a>
            </NavItem>
          </Nav>
          <NavbarBrand>{siteConfig.nama}</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <Link to="/home">
                <NavLink> Home</NavLink>
              </Link>
            </NavItem>
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
