import { useCallback, useEffect, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import { ROUTS } from "@config/routs";
import { Product } from "@config/types";
import { getAllProducts } from "@store/products";
import { generatePath, useNavigate } from "react-router-dom";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Product[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const isLoading = products === null || visibleProducts === null;

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initProducts = async () => {
      const data = await getAllProducts();

      const updatedData = data.map((product: Product) => {
        product.onClick = () =>
          navigate(generatePath(ROUTS.PRODUCT, { id: product.id }));
        return product;
      });

      setProducts(updatedData);
    };

    initProducts();
  }, [navigate]);

  useEffect(() => {
    if (products) {
      const items = products.slice(
        LIMIT * currentPage - LIMIT,
        LIMIT * currentPage
      );

      setVisibleProducts(items);
    }
  }, [products, currentPage]);

  if (isLoading) {
    return <Loader position={LoaderPosition.centered} />;
  }

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        <Badge>{products.length}</Badge>
      </header>

      <CardList cards={visibleProducts} />

      <Pagination
        className={styles.pagination}
        length={products.length}
        limit={LIMIT}
        current={currentPage}
        onChange={onPageChange}
      />
    </section>
  );
};

export default Catalog;
