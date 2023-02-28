import Header from "@components/Header";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
