import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>list of countries</p> */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;All Rights To TravelTrove {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
