import Layout from "@components/Layout";
import { ROUTS } from "@config/routs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTS.INDEX} element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path={ROUTS.PRODUCT} element={<ProductPage />} />
          <Route path={ROUTS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
