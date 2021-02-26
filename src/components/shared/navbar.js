import React, { useState } from 'react';
import UseUser from "../../hooks/UseUser"
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';

export const Navbar = (props) => {
    const {logout} = UseUser()
    const [showDialog, setShowDialog] = useState(false)

    const hideDialog = () => {
        setShowDialog(false)
    }

    const showDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={logout} />
    </React.Fragment>
    )

    const handleClick = () => {
        setShowDialog(true)
        
    }

    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">               
                <button type="button" className="p-link">
                    <span className="layout-topbar-icon pi pi-user" />
                </button>              
                <button onClick={handleClick} type="button" className="p-link">
                    <span className="layout-topbar-icon pi pi-sign-out" />
                </button>
            </div>
            <Dialog visible={showDialog} style={{ width: '450px' }} header="Confirm" modal footer={showDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                   <span>Are you sure you want to logout?</span>
                </div>
            </Dialog>
        </div>
    );
}
