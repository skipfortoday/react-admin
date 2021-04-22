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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button
} from "reactstrap";
import { siteConfig } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserTie } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let ambil = JSON.parse(localStorage.getItem('user'));
  let nama = ambil.AdminID
  console.log(ambil);

  return (
    <div>

      <Navbar color="dark" dark expand="md">
        <img src="/logodarkgold.jpeg" alt="logodarkgold" />
        <NavbarBrand> </NavbarBrand>
        <NavbarBrand> L'viors Attendance System ~ </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            { ambil.RoleAdmin === 99 ?
              (
                <NavItem>
                  <Link to="/superadmin">
                    <NavLink> Super Admin </NavLink>
                  </Link>
                </NavItem>    
              ) : ("")
            }
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
            {ambil.RoleAdmin === 99 ?
              (
                <NavItem>
                  <Link to="/cabang">
                    <NavLink>Cabang </NavLink>
                  </Link>
                </NavItem>
              ) : ("")
            }
            <NavItem>
              <a href={"/laporan"}>
                <NavLink> Laporan </NavLink>
              </a>
            </NavItem>

            <NavItem>
              <a href={"/history"}>
                <NavLink> History </NavLink>
              </a>
            </NavItem>
          </Nav>

          <Nav navbar>
            <NavItem>
              <NavbarBrand> {siteConfig.nama}</NavbarBrand>
            </NavItem>
            {/* <NavItem>
              <NavbarBrand> {nama}</NavbarBrand>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={faUserTie} />&nbsp;{nama}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <div color="dark" onClick={() => localStorage.clear()}>
                  <a href={"/home"} style={{textDecoration:"none", color:"unset"}}>
                    <FontAwesomeIcon icon={faSignOutAlt} />&nbsp; Logout
                  </a>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {/* <a href={"/home"}>
            <LogoutComponent />
          </a> */}
        </Collapse>
      </Navbar>


    </div>
  );
};

export default NavbarComponent;
