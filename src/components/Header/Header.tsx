import { FC, memo } from "react";

import Icon, { IconType } from "@components/Icon";
import { IconSize } from "@components/Icon/Icon";
import { ROUTS } from "@config/routs";
import logo from "@static/img/logo.svg";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTS.INDEX} className={styles.logo}>
          <img src={logo} width="131" height="42" alt="Lalasia" />
        </Link>

        <Link to={ROUTS.USER}>
          <Icon type={IconType.user} size={IconSize.l} />
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
