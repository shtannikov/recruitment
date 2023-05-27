import React, {FC} from 'react';
import {Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu: FC = () => {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand>recruitment</NavbarBrand>
          <ul className="navbar-nav flex-grow">
            <NavItem>
                <a style={{ textDecoration: "none" }} className="text-dark" href={'/logout'}>Выйти</a>
            </NavItem>
          </ul>
        </Navbar>
      </header>
    );
}
