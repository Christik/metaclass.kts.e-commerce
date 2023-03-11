import { FC, memo } from "react";

import { ROUTS } from "@config/routs";
import logo from "@static/img/logo.svg";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink
          to={ROUTS.INDEX}
          className={({ isActive }) =>
            isActive ? styles["active-logo"] : styles.logo
          }
        >
          <img src={logo} width="131" height="42" alt="Lalasia" />
        </NavLink>
      </div>
    </header>
  );
};

export default memo(Header);
