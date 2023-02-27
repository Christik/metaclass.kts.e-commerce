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
  const [productCount, setProductCount] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const isLoading = products === null || productCount === null;

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initProductCount = async () => {
      const data = await getAllProducts();

      setProductCount(data.length);
    };

    initProductCount();
  }, []);

  useEffect(() => {
    const initProducts = async () => {
      const offset = currentPage * LIMIT - LIMIT;
      const data = await getAllProducts(offset, LIMIT);

      const updatedData = data.map((product: Product) => {
        product.onClick = () =>
          navigate(generatePath(ROUTS.PRODUCT, { id: product.id }));
        return product;
      });

      setProducts(updatedData);
    };

    initProducts();
  }, [navigate, currentPage]);

  if (isLoading) {
    return <Loader position={LoaderPosition.centered} />;
  }

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        <Badge>{productCount}</Badge>
      </header>

      <CardList cards={products} />

      <Pagination
        className={styles.pagination}
        length={productCount}
        limit={LIMIT}
        current={currentPage}
        onChange={onPageChange}
      />
    </section>
  );
};

export default Catalog;
