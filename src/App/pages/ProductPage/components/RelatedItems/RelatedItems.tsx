import { FC, useEffect } from "react";

import CardList from "@components/CardList";
import InfoMessage from "@components/InfoMessage";
import Loader, { LoaderPosition } from "@components/Loader";
import Title, { TitleSize } from "@components/Title";
import { CategoryModel } from "@store/models/product";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./RelatedItems.module.scss";

type RelatedItemsProps = {
  className?: string;
  category: CategoryModel;
};

const LIMIT = 3;

const RelatedItems: FC<RelatedItemsProps> = ({ className, category }) => {
  const productsStore = useLocalStore(() => new ProductsStore(LIMIT));

  const { id } = category;

  useEffect(() => {
    productsStore.setCategory(id);
    productsStore.getProducts();
  }, [id, productsStore]);

  return (
    <section className={className}>
      <Title className={styles.header} size={TitleSize.s}>
        Related items
      </Title>

      {productsStore.isLoading && <Loader position={LoaderPosition.centered} />}

      {productsStore.isError && (
        <InfoMessage>Oops. Something went wrong.</InfoMessage>
      )}

      {productsStore.isSuccess && <CardList cards={productsStore.list} />}
    </section>
  );
};

export default observer(RelatedItems);
