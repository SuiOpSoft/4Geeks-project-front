import React, { useState }from "react";
import { Dialog } from 'primereact/dialog';


export const HomeUser = () => {

  const [displayBasicInput, setDisplayBasicInput] = useState(false);
  const [displayBasicOutput, setDisplayBasicOutput] = useState(false);
  const [displayBasicChart, setDisplayBasicChart] = useState(false);
  const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasicInput': setDisplayBasicInput,
       'displayBasicOutput': setDisplayBasicOutput,
       'displayBasicChart': setDisplayBasicChart
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    
  return (
    <div className="index">
      <div className="dialog-demo home-user-grid">
        <div className="card home-user-img-input " onClick={() => onClick('displayBasicInput')}>
          <img className="home-user-img" alt="Logo" src="/assets/layout/images/SuiOpSoft-logo-sm.png"/>                
        </div>
        <div className="card home-user-img-out " onClick={() => onClick('displayBasicOutput')}>
          <img className="home-user-img" alt="Logo" src="/assets/layout/images/SuiOpSoft-logo-sm.png"/>            
        </div>
        <div className="card home-user-img-chart " onClick={() => onClick('displayBasicChart')}>
          <img className="home-user-img" alt="Logo" src="/assets/layout/images/SuiOpSoft-logo-sm.png" />
        </div>
          <Dialog header="Input Data" visible={displayBasicInput} style={{ width: '50vw' }} onHide={() => onHide('displayBasicInput')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Dialog>
          <Dialog header="Output Data" visible={displayBasicOutput} style={{ width: '50vw' }} onHide={() => onHide('displayBasicOutput')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Dialog>
          <Dialog header="Charts" visible={displayBasicChart} style={{ width: '50vw' }} onHide={() => onHide('displayBasicChart')}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Dialog>
      </div>
    </div>
  );
};
