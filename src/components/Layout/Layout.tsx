import { FC } from "react";

import Header from "@components/Header";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";

const Layout: FC = () => {
  useQueryParamsStoreInit();

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
