import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { DataReliefValve } from "../components/inputs/DataReliefValve";
import { DataFluids } from "../components/inputs/DataFluids";
import { DataSeparators } from "../components/inputs/DataSeparators";
import { DataLevelControlValves } from "../components/inputs/DataLevelControlValve";
import { Navbar } from "../components/shared/navbar";
import { SideBar } from "../components/shared/SideBar";
import { HomeUser } from "../components/shared/HomeUser";
import { Footer } from "../components/shared/Footer";

import classNames from "classnames";

export const Home = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("outlined");
  const sidebar = useRef();
  let menuClick = false;
  const logo =
    layoutColorMode === "dark"
      ? "assets/layout/images/SuiOpSoft-logo-sm.png"
      : "assets/layout/images/SuiOpSoft-logo-sm.png";
  const menu = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      to: "/homeUser",
    },
    {
      label: "Inputs",
      icon: "pi pi-fw pi-sitemap",
      items: [
        { label: "Fluids", icon: "pi pi-fw pi-table", to: "/fluids" },
        {
          label: "Separators",
          icon: "pi pi-fw pi-table",
          to: "/separators",
        },
        {
          label: "Relief Valves",
          icon: "pi pi-fw pi-table",
          to: "/dataReliefValve",
        },
        {
          label: "Level Control Valves",
          icon: "pi pi-fw pi-table",
          to: "/dataLevelControlValves",
        },
      ],
    },
    {
      label: "Outputs",
      icon: "pi pi-fw pi-external-link",
      items: [
        { label: "Separators Results", icon: "pi pi-fw pi-table", to: "/separatorResults" },
      ],
    },
    {
      label: "Charts",
      icon: "pi pi-fw pi-chart-bar",
      items: [
        { label: "Gas Chart", icon: "pi pi-fw pi-chart-line", to: "/gasChart" },
        { label: "Liquid Chart", icon: "pi pi-fw pi-chart-line", to: "/liquidChart" },
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

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
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
        <Route path="/homeUser" component={HomeUser} />
        <Route path="/fluids" component={DataFluids} />
        <Route path="/separators" component={DataSeparators} />  
        <Route path="/dataReliefValve" component={DataReliefValve} />
        <Route path="/dataLevelControlValves" component={DataLevelControlValves} />
      </div>

      <Footer />

    </div>
  );
};
