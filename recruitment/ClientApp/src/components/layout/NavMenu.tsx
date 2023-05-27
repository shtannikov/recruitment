import React, {FC} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './NavMenu.css';

export const NavMenu: FC = () => {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand>recruitment</NavbarBrand>
        </Navbar>
      </header>
    );
}
