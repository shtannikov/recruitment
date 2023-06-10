import React, {FC} from 'react';
import {Navbar, NavbarBrand, NavItem} from 'reactstrap';
import './NavMenu.css';
import {usePageContext} from "../../utils/usePageContext";

export const NavMenu: FC = () => {
    const pageContext = usePageContext();
    
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand>recruitment</NavbarBrand>
            <NavItem tag={"div"} className="text-dark">
                {pageContext.title}
            </NavItem>         
          <ul className="navbar-nav flex-grow">
            <NavItem>
                <a style={{ textDecoration: "none" }} className="text-dark" href={'/logout'}>Logout</a>
            </NavItem>
          </ul>
        </Navbar>
      </header>
    );
}
