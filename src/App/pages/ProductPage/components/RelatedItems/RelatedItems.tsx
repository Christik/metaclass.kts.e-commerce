import { FC, memo } from "react";

import CardList from "@components/CardList";
import Title, { TitleSize } from "@components/Title";
import { Product } from "@config/types";

import styles from "./RelatedItems.module.scss";

type RelatedItemsProps = {
  className?: string;
  products: Product[];
};

const RelatedItems: FC<RelatedItemsProps> = ({ className, products }) => {
  return (
    <section className={className}>
      <Title className={styles.header} size={TitleSize.s}>
        Related items
      </Title>

      <CardList cards={products} />
    </section>
  );
};

export default memo(RelatedItems);
