import { useCallback, useEffect } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog = () => {
  const productsStore = useLocalStore(() => new ProductsStore());

  const isLoading = productsStore.meta === Meta.loading;
  const isSuccess = productsStore.meta === Meta.success;

  const onPageChange = useCallback(
    (page: number) => {
      const updateProducts = async () => {
        window.scrollTo(0, 0);
        productsStore.setPage(page);
        await productsStore.getProducts();
      };

      updateProducts();
    },
    [productsStore]
  );

  useEffect(() => {
    const initProducts = async () => {
      productsStore.setLimit(LIMIT);
      await productsStore.getProducts();
    };

    initProducts();
  }, [productsStore]);

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        {isSuccess && <Badge>{productsStore.count}</Badge>}
      </header>

      {isLoading ? (
        <Loader position={LoaderPosition.centered} />
      ) : (
        <CardList cards={productsStore.list} />
      )}

      <Pagination
        className={styles.pagination}
        length={productsStore.count}
        limit={productsStore.limit}
        current={productsStore.page}
        onChange={onPageChange}
      />
    </section>
  );
};

export default observer(Catalog);
