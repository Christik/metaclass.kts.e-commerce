import { FC, useCallback, useEffect } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import InfoMessage from "@components/InfoMessage";
import Loader, { LoaderPosition } from "@components/Loader";
import Pagination from "@components/Pagination";
import Title from "@components/Title";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./Catalog.module.scss";

const LIMIT = 9;

const Catalog: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const productsStore = useLocalStore(() => new ProductsStore(LIMIT));

  const isLoading = productsStore.meta === Meta.loading;
  const isSuccess = productsStore.meta === Meta.success && productsStore.limit;
  const isError = productsStore.meta === Meta.error;
  const isEmpty = isSuccess && productsStore.list.length === 0;

  const onPageChange = useCallback(
    (page: number) => {
      window.scrollTo(0, 0);
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    productsStore.getProducts();
  }, [productsStore]);

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        {isSuccess && <Badge>{productsStore.count}</Badge>}
      </header>

      {isLoading && <Loader position={LoaderPosition.centered} />}

      {isError && <InfoMessage>Oops. Something went wrong.</InfoMessage>}

      {isSuccess && (
        <>
          <CardList cards={productsStore.list} />

          <Pagination
            className={styles.pagination}
            length={productsStore.count as number}
            limit={productsStore.limit}
            current={productsStore.page}
            onChange={onPageChange}
          />
        </>
      )}

      {isEmpty && <InfoMessage>No results</InfoMessage>}
    </section>
  );
};

export default observer(Catalog);
