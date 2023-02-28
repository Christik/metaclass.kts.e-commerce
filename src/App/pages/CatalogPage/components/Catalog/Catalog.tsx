import { useCallback, useEffect, useRef, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import ProductCountStore from "@store/ProductCountStore";
import ProductsStore from "@store/ProductsStore";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isCountLoading, setIsCountLoading] = useState(true);

  const productsStoreRef = useRef<ProductsStore | null>(null);
  const productCountStoreRef = useRef<ProductCountStore | null>(null);

  if (productsStoreRef.current === null) {
    productsStoreRef.current = new ProductsStore();
  }

  if (productCountStoreRef.current === null) {
    productCountStoreRef.current = new ProductCountStore();
  }

  const productsStore = productsStoreRef.current;
  const productCountStore = productCountStoreRef.current;

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initProductCount = async () => {
      await productCountStore.getCount();
      setIsCountLoading(false);
    };

    initProductCount();
  }, [productCountStore]);

  useEffect(() => {
    const initProducts = async () => {
      const offset = currentPage * LIMIT - LIMIT;
      await productsStore.getProducts(offset, LIMIT);

      setIsProductsLoading(false);
    };

    initProducts();
  }, [currentPage, productsStore]);

  if (isProductsLoading || isCountLoading) {
    return <Loader position={LoaderPosition.centered} />;
  }

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        <Badge>{productCountStore.count}</Badge>
      </header>

      <CardList cards={productsStore.list} />

      <Pagination
        className={styles.pagination}
        length={productCountStore.count}
        limit={LIMIT}
        current={currentPage}
        onChange={onPageChange}
      />
    </section>
  );
};

export default Catalog;
