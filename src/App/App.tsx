import { FC, useEffect } from "react";

import Layout from "@components/Layout";
import PrivateRoute from "@components/PrivateRoute";
import { ROUTS } from "@config/routs";
import rootStore from "@store/RootStore/instance";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";

const App: FC = () => {
  useEffect(() => {
    rootStore.auth.getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTS.INDEX} element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path={ROUTS.PRODUCT} element={<ProductPage />} />
          <Route
            path={ROUTS.USER}
            element={
              <PrivateRoute authStatus={rootStore.auth.status}>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default observer(App);
