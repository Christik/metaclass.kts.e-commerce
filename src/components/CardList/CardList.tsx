import { FC } from "react";

import Card from "@components/Card";
import { Product } from "@config/types";

import styles from "./CardList.module.scss";

type CardListProps = {
  cards: Product[];
};

const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className={styles.cardList}>
      {cards.map(({ id, image, category, title, subtitle, price }) => (
        <Card
          key={id}
          image={image}
          category={category}
          title={title}
          subtitle={subtitle}
          price={`$${price}`}
        />
      ))}
    </div>
  );
};

export default CardList;
