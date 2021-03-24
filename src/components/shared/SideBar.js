import React from "react";
import { CSSTransition } from "react-transition-group";
import { AppMenu } from './AppMenu';

export const SideBar = (props) => {
  return (
    <div>
      <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={props.isSidebarVisible()}
        unmountOnExit
      >
        <div
          ref={props.sidebar}
          className={props.sidebarClassName}
          onClick={props.onSidebarClick}
        >
          <div className="layout-logo">
            <img alt="Logo" src={props.logo} />
          </div>
          {/* <AppProfile /> */}
          <AppMenu model={props.menu} onMenuItemClick={props.onMenuItemClick} />
        </div>
      </CSSTransition>
    </div>
  );
};
