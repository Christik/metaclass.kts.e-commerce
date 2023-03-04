import { useState, useEffect, ChangeEvent, useDeferredValue } from "react";

import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@store/RootStore/instance";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./CatalogPage.module.scss";
import Catalog from "./components/Catalog";

const CatalogPage = () => {
  useQueryParamsStoreInit();

  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    rootStore.query.getParam("search") ?? ""
  );
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    if (deferredSearch) {
      setSearchParams({ search: deferredSearch });
    } else {
      setSearchParams({});
    }
  }, [deferredSearch, setSearchParams]);

  return (
    <>
      <header className={styles.header}>
        <Title size={TitleSize.l}>Products</Title>
        <Text className={styles["header__text"]}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </header>

      <input
        style={{ border: "solid 1px #000", margin: "0 0 30px" }}
        type="text"
        value={search}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setSearch(evt.target.value)
        }
      />

      <Catalog />
    </>
  );
};

export default observer(CatalogPage);
