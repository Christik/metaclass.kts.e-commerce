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
        {productsStore.isSuccess && <Badge>{productsStore.count}</Badge>}
      </header>

      {productsStore.isLoading && <Loader position={LoaderPosition.centered} />}

      {productsStore.isError && (
        <InfoMessage>Oops. Something went wrong.</InfoMessage>
      )}

      {productsStore.isSuccess && productsStore.limit && (
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

      {productsStore.isEmpty && <InfoMessage>No results</InfoMessage>}
    </section>
  );
};

export default observer(Catalog);
