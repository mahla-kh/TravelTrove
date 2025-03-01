import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import React from "react";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/created-logo2.png"
        alt="TravelTrove logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
