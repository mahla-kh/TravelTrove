import styles from "./Login.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, logIn } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("qwerty");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated]
  );

  function onClickHandler(e) {
    e.preventDefault();

    if (email && password) logIn(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={onClickHandler}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.cta}>Login</button>
        </div>
      </form>
    </main>
  );
}
