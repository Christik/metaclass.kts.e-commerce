import { FC, useEffect } from "react";

import Layout from "@components/Layout";
import Loader from "@components/Loader";
import PrivateRoute from "@components/PrivateRoute";
import { ROUTS } from "@config/routs";
import rootStore from "@store/RootStore/instance";
import { AuthStatus } from "@utils/auth";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.scss";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";

const App: FC = () => {
  useEffect(() => {
    rootStore.auth.getUser();
  }, []);

  return (
    <BrowserRouter>
      {rootStore.auth.status === AuthStatus.unknown ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route path={ROUTS.INDEX} element={<Layout />}>
            <Route index element={<CatalogPage />} />
            <Route path={ROUTS.PRODUCT} element={<ProductPage />} />
            <Route
              path={ROUTS.USER}
              element={
                <PrivateRoute isAuthorized={rootStore.auth.isAuthorized}>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route path={ROUTS.LOGIN} element={<LoginPage />} />
            <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default observer(App);
