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
const OfflineNavbar = (props) => {
   const [collapsed, setCollapsed] = useState(true);

   const toggleNavbar = () => setCollapsed(!collapsed);

   return (
      <div>

         <Navbar color="dark" dark expand="md" fixed="top">
            <img src="/logodarkgold.jpeg" alt="logodarkgold" />
            <NavbarBrand> </NavbarBrand>
            <NavbarBrand> L'viors Attendance System</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
               <Nav className="mr-auto" navbar>

                  <NavItem>
                     <Link to={"/offlinemasuk"}>
                        <NavLink> MASUK</NavLink>
                     </Link>
                  </NavItem>
                  <NavItem>
                     <Link to={"/offlinepulang"}>
                        <NavLink> PULANG</NavLink>
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

               </Nav>
            </Collapse>
         </Navbar>


      </div>
   );
};

export default OfflineNavbar;