import React from "react";
import styles from "./Button.module.css";
function Button({ children, type, onClickHandler }) {
  return (
    <button
      className={`${styles[type]} ${styles.btn}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
