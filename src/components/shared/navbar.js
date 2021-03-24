import React, { useState } from 'react';
import UseUser from "../../hooks/UseUser"
import UseCompany from "../../hooks/UseCompany"
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { Account } from "../../hooks/Account"
import { Dropdown } from 'primereact/dropdown';
import { Link } from 'react-router-dom';



export const Navbar = (props) => {
    const { logout } = UseUser()
    const {logoutCompany} = UseCompany()
    const [showDialog, setShowDialog] = useState(false)
    const [account, setAccount] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { isLogged } = UseUser()
    const { isLoggedCompany } = UseCompany()
    
    
    const countries = [
        {name: 'Australia', code: 'AU'},
        {name: 'Brazil', code: 'BR'},
        {name: 'China', code: 'CN'},
        {name: 'Egypt', code: 'EG'},
        {name: 'France', code: 'FR'},
        {name: 'Germany', code: 'DE'},
        {name: 'India', code: 'IN'},
        {name: 'Japan', code: 'JP'},
        {name: 'Spain', code: 'ES'},
        {name: 'United States', code: 'US'}
    ];

    const onCountryChange = (e) => {
        setSelectedCountry(e.value);
    }

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const countryOptionTemplate = (option) => {
        return (
            <div className="country-item">
                
                <div>{option.name}</div>
            </div>
        );
    }

    const hideDialog = () => {
        setShowDialog(false)
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const dialogFuncMap = {
        'account': setAccount,

    }
    

    const showDialogFooter = (
        <React.Fragment>
            {isLogged && <><Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDialog} />
                        <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={logout} /></>
            }
            {isLoggedCompany && <><Button label="No" icon="pi pi-times" className="p-button-text dialog-no" onClick={hideDialog} />
                        <Button label="Yes" icon="pi pi-check" className="p-button-text dialog-yes" onClick={logoutCompany} /></>
            }
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
            <div className="layout-topbar-icons d-flex align-self-center">
                {isLoggedCompany &&
                    <Link to="/home/homeadmin">
                        <button type="button" className="p-link mr-4">
                            <span className="layout-topbar-icon pi pi-cog" />
                        </button>
                    </Link>
                }
            <Dropdown className="drop-menu custom-target-icon" value={selectedCountry} options={countries} onChange={onCountryChange} optionLabel="name" filter filterBy="name" placeholder="Select a Country"
                    valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} />
                {isLogged &&
                    <button onClick={() => onClick('account')} type="button" className="p-link ">
                        <span className="layout-topbar-icon pi pi-user" />
                    </button>
                }
                <button onClick={handleClick} type="button" className="p-link ">
                    <span className="layout-topbar-icon pi pi-sign-out" />
                </button>
            </div>
            <Dialog visible={showDialog} style={{ width: '450px' }} header="Confirm" modal footer={showDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                   <span>Are you sure you want to logout?</span>
                </div>
            </Dialog>
            <Dialog header="Account" visible={account} style={{ width: '15vw' }} onHide={() => onHide('account')}>
                <Account/>
            </Dialog>
        </div>
    );
}

