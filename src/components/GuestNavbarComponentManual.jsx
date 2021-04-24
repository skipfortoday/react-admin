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
              <Link to={"/absensimanual"}>
              {/* <a href={"/absensimanual"}> */}
                <NavLink>Masuk </NavLink>
              {/* </a> */}
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/absensimanualpulang"}>  
                <NavLink> Pulang</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/absensimanualistirahatkeluar"}>
                <NavLink> Istirahat Keluar</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/absensimanualistirahatkembali"}>
                <NavLink> Istirahat Kembali</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/absensimanualkeluarkantor"}>
                <NavLink> Keluar Kantor</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/absensimanualkembalikantor"}>
                <NavLink> Kembali Kantor</NavLink>
              </Link>
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
