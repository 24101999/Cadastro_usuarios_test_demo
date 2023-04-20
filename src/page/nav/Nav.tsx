import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";

type Props = {};

const Nav = (props: Props) => {
  const nav = useNavigate();

  return (
    <nav className={styles.nav}>
      <h2>Page</h2>
      <div className={styles.links}>
        <p>Home</p>
        <p>About</p>
      </div>
    </nav>
  );
};

export default Nav;
