import React from 'react';
import {Link} from 'react-router-dom'

export const Navbar = (props) => {
    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">               
                <button type="button" className="p-link">
                    <span className="layout-topbar-icon pi pi-user" />
                </button>
                <Link to="/">
                <button type="button" className="p-link" to="">
                    <span className="layout-topbar-icon pi pi-sign-out" />
                </button></Link>
            </div>
        </div>
    );
}
