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
} from "reactstrap";
import { siteConfig } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserTie } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let ambil = JSON.parse(localStorage.getItem("user"));
  let nama = ambil.AdminID;

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <img src="/logodarkgold.jpeg" alt="logodarkgold" />
        <NavbarBrand> </NavbarBrand>
        <NavbarBrand> L'viors Attendance System ~ </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            {ambil.RoleAdmin === 99 ? (
              <NavItem>
                <Link to="/superadmin">
                  <NavLink> Super Admin </NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}
            <NavItem>
              <Link to="/">
                <NavLink> Pegawai </NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Status Absensi
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem style={{paddingLeft:0, paddingRight:0}}>
                  <Link to="/izin" style={{display:"block", width:"100%", paddingLeft:"1.5em", paddingRight:"1.5em"}}>
                   Perorangan
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{paddingLeft:0, paddingRight:0}}>
                  <Link to="/izin/group" style={{display:"block", width:"100%", paddingLeft:"1.5em", paddingRight:"1.5em"}}>
                    Pergroup & Libur Umum                    
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{paddingLeft:0, paddingRight:0}}>
                  <Link to="/kelengkapanabsensi" style={{display:"block", width:"100%", paddingLeft:"1.5em", paddingRight:"1.5em"}}>
                    Absen Belum Lengkap
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link to="/group">
                <NavLink> Group </NavLink>
              </Link>
            </NavItem>
            {ambil.RoleAdmin === 99 ? (
              <NavItem>
                <Link to="/cabang">
                  <NavLink>Cabang </NavLink>
                </Link>
              </NavItem>
            ) : (
              ""
            )}
            <NavItem>
              <Link to="/laporan">
                <NavLink> Laporan </NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/history">
             
                <NavLink> History </NavLink>
              
              </Link>
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
                <FontAwesomeIcon icon={faUserTie} />
                &nbsp;{nama}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <div color="dark" onClick={() => localStorage.removeItem('user')}>
                    <a
                      href={"/home"}
                      style={{ textDecoration: "none", color: "unset" }}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      &nbsp; Logout
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
