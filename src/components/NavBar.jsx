import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">pricing</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
