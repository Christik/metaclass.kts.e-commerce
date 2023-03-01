import { useCallback, useEffect, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import ProductCountStore from "@store/ProductCountStore";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const productsStore = useLocalStore(() => new ProductsStore());
  const productCountStore = useLocalStore(() => new ProductCountStore());

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
