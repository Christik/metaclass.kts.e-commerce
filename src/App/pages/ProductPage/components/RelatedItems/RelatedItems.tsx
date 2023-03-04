import { FC, useEffect } from "react";

import CardList from "@components/CardList";
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
  const productsStore = useLocalStore(() => new ProductsStore());

  const isLoading = productsStore.meta === Meta.loading;
  const isSuccess = productsStore.meta === Meta.success;

  const { id } = category;

  useEffect(() => {
    const initProducts = async () => {
      productsStore.setLimit(LIMIT);
      productsStore.setCategory(id);
      await productsStore.getProducts();
    };

    initProducts();
  }, [id, productsStore]);

  return (
    <section className={className}>
      <Title className={styles.header} size={TitleSize.s}>
        Related items
      </Title>

      {isLoading && <Loader position={LoaderPosition.centered} />}

      {isSuccess && <CardList cards={productsStore.list} />}
    </section>
  );
};

export default observer(RelatedItems);
