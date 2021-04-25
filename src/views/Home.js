import React, { useEffect, useRef, useState } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import classNames from "classnames";
import { DataReliefValve } from "../components/inputs/DataReliefValve";
import { DataFluids } from "../components/inputs/DataFluids";
import { DataSeparators } from "../components/inputs/DataSeparators";
import { DataLevelControlValves } from "../components/inputs/DataLevelControlValve";
import { Navbar } from "../components/shared/navbar";
import { SideBar } from "../components/shared/SideBar";
import { HomeUser } from "../components/shared/HomeUser";
import { Footer } from "../components/shared/Footer";
import { OutputSeparatorGasAndLiquidAreas } from "../components/outputs/OutputSeparatorGasAndLiquidAreas"
import {OutputInletNozzleParameters} from "../components/outputs/OutputInletNozzleParameters"
import {OutputGasNozzleParameters} from "../components/outputs/OutputGasNozzleParameters"
import {OutputLiquidNozzleParameters} from "../components/outputs/OutputLiquidNozzleParameters"
import { OutputVesselGasCapacityParameters } from "../components/outputs/OutputVesselGasCapacityParameters";
import { OutputVesselLiquidCapacityParameters } from "../components/outputs/OutputVesselLiquidCapacityParameters";
import { OutputReliefValveParameters } from "../components/outputs/OutputReliefValveParameters";
import { OutputLevelControlValveParameters } from "../components/outputs/OutputLevelControlValveParameters";
import {GasChart} from "../components/charts/GasChart"
import {LiquidChart} from "../components/charts/LiquidChart"
import UseUser from '../hooks/UseUser'
import UseCompany from '../hooks/UseCompany'
import { HomeAdmin } from "../components/admin/HomeAdmin"


export const Home = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("outlined");
  const sidebar = useRef();
  const { isLogged } = UseUser()
  const {isLoggedCompany} = UseCompany()
  let menuClick = false;

  const logo =
    layoutColorMode === "dark"
      ? "/assets/layout/images/SuiOpSoft-logo-disfuminado.png"
      : "/assets/layout/images/SuiOpSoft-logo-sm.png";
  
      const menu = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      to: "/home/homeuser",
    },
    {
      label: "Inputs",
      icon: "pi pi-fw pi-sitemap",
      items: [
        { label: "Fluids", 
          icon: "pi pi-fw pi-table",
          to:"/home/datafluids"
        },
        {
          label: "Separators",
          icon: "pi pi-fw pi-table",
          to: "/home/separators",
        },
        {
          label: "Relief Valves",
          icon: "pi pi-fw pi-table",
          to: "/home/datareliefvalve",
        },
        {
          label: "Level Control Valves",
          icon: "pi pi-fw pi-table",
          to: "/home/datalevelcontrolvalves",
        },
      ],
    },
    {
      label: "Outputs",
      icon: "pi pi-fw pi-external-link",
      items: [
        { label: "Separators Gas and Liquid Areas", icon: "pi pi-fw pi-table", to: "/home/separatorGasAndLiquidAreas" },
        { label: "Inlet Nozzle Parameters", icon: "pi pi-fw pi-table", to: "/home/inletNozzleParameters" },
        { label: "Gas Nozzle Parameters", icon: "pi pi-fw pi-table", to: "/home/gasNozzleParameters" },
        { label: "Liquid Nozzle Parameters", icon: "pi pi-fw pi-table", to: "/home/liquidNozzleParameters" },
        { label: "Vessel Gas Capacity Parameters", icon: "pi pi-fw pi-table", to: "/home/vesselGasCapacityParameters" },
        { label: "Vessel Liquid Capacity Parameters", icon: "pi pi-fw pi-table", to: "/home/vesselLiquidCapacityParameters" },
        { label: "Relief Valve Parameters", icon: "pi pi-fw pi-table", to: "/home/outputReliefValveParameters" },
        { label: "Level Control Valve Parameters", icon: "pi pi-fw pi-table", to: "/home/levelControlValveParameters" }
      ],
    },
    {
      label: "Charts",
      icon: "pi pi-fw pi-chart-bar",
      items: [
        { label: "Gas Chart", icon: "pi pi-fw pi-chart-line", to: "/home/gaschart" },
        { label: "Liquid Chart", icon: "pi pi-fw pi-chart-line", to: "/home/liquidchart" },
      ],
    },
  ];

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
    "layout-sidebar-light": layoutColorMode === "light",
  });

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
  });

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    menuClick = false;
  };
  const isDesktop = () => {
    return window.innerWidth > 1024;
  };
  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const onSidebarClick = () => {
    menuClick = true;
  };
  const isSidebarVisible = () => {
    if (isDesktop()) {
      if (layoutMode === "static") return !staticMenuInactive;
      else if (layoutMode === "overlay") return overlayMenuActive;
      else return true;
    }

    return true;
  };
  const onToggleMenu = (event) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        setOverlayMenuActive((prevState) => !prevState);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }
    event.preventDefault();
  };


  if(!isLogged && !isLoggedCompany){
    return <Redirect to="/signin" />
  }else{
    return (
      <div className={wrapperClass} onClick={onWrapperClick}>
        {isLogged || isLoggedCompany && <Redirect to="/home/homeuser" />}
        <Navbar onToggleMenu={onToggleMenu} />
      <SideBar
        isSidebarVisible={isSidebarVisible}
        sidebar={sidebar}
        sidebarClassName={sidebarClassName}
        onSidebarClick={onSidebarClick}
        logo={logo}
        menu={menu}
        onMenuItemClick={onMenuItemClick}
      />

      <div className="layout-main">
        <Switch>
        <Route exact path="/home/homeuser" component={HomeUser} />
        <Route path="/home/datafluids" component = {DataFluids} />
        <Route path="/home/separators" component={DataSeparators} />  
        <Route path="/home/datareliefvalve" component={DataReliefValve} />
        <Route path="/home/datalevelcontrolvalves" component={DataLevelControlValves} />
        <Route path="/home/separatorGasAndLiquidAreas" component={OutputSeparatorGasAndLiquidAreas} />
        <Route path="/home/inletNozzleParameters" component={OutputInletNozzleParameters} />
        <Route path="/home/gasNozzleParameters" component={OutputGasNozzleParameters} />
        <Route path="/home/liquidNozzleParameters" component={OutputLiquidNozzleParameters} />
        <Route path="/home/vesselGasCapacityParameters" component={OutputVesselGasCapacityParameters} />
        <Route path="/home/vesselLiquidCapacityParameters" component={OutputVesselLiquidCapacityParameters} />
        <Route path="/home/outputReliefValveParameters" component={OutputReliefValveParameters} />
        <Route path="/home/levelControlValveParameters" component={OutputLevelControlValveParameters} />
        <Route path="/home/gaschart" component={GasChart} />
        <Route path="/home/liquidchart" component={LiquidChart} />
        <Route path="/home/homeadmin" component={HomeAdmin} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
  }
};
