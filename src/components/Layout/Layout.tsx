import { FC } from "react";

import Header from "@components/Header";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import styles from "./Layout.module.scss";

import "react-toastify/dist/ReactToastify.css";

const Layout: FC = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>

      <ToastContainer position="top-center" />
    </>
  );
};

export default Layout;
