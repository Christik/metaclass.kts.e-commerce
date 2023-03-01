import { useCallback, useEffect, useRef, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import ProductCountStore from "@store/ProductCountStore";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    };

    initProductCount();
  }, [productCountStore]);

  useEffect(() => {
    const initProducts = async () => {
      const offset = currentPage * LIMIT - LIMIT;
      await productsStore.getProducts(offset, LIMIT);
    };

    initProducts();
  }, [currentPage, productsStore]);

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        {productCountStore.meta === Meta.success && (
          <Badge>{productCountStore.count}</Badge>
        )}
      </header>

      {productsStore.meta === Meta.loading ? (
        <Loader position={LoaderPosition.centered} />
      ) : (
        <CardList cards={productsStore.list} />
      )}

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

export default observer(Catalog);
