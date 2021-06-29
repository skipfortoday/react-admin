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
    let nama = ambil.Username;

    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <img src="/logodarkgold.jpeg" alt="logodarkgold" />
                <NavbarBrand> </NavbarBrand>
                <NavbarBrand> L'viors Attendance System ~ </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="mr-auto" navbar>
                            <NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Admin
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <Link to="/tutup-periode" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                                Tutup Absensi
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <Link to="/superadmin" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                                Admin
                                            </Link>
                                        </DropdownItem>
                                        {ambil.RoleAdmin === 99 ? (
                                        <div>
                                        <DropdownItem divider />
                                        <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <Link to="/cabang" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                                Cabang
                                            </Link>
                                        </DropdownItem>
                                        </div>
                                        ) : (
                                            ""
                                        )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
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
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/izin" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Perorangan
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/izin/group" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Pergroup & Libur Umum
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/kelengkapanabsensi" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
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
                        <NavItem>
                            <Link to="/pengumuman">
                                <NavLink> Pengumuman </NavLink>
                            </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Manual
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanual" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Masuk
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanualpulang" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Pulang
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanualistirahatkeluar" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Istirahat Keluar
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanualistirahatkembali" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Istirahat Kembali
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanualkeluarkantor" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Kaluar Kantor
                                    </Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to="/absensimanualkembalikantor" style={{ display: "block", width: "100%", paddingLeft: "1.5em", paddingRight: "1.5em" }}>
                                        Kembali Kantor
                                    </Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavbarBrand> {siteConfig.nama}</NavbarBrand>
                        </NavItem>

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
