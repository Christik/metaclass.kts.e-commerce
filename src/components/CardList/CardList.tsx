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
      {cards.map(
        ({ id, image, category, title, description, price, onClick }) => (
          <Card
            key={id}
            image={image}
            category={category}
            title={title}
            subtitle={description}
            price={price}
            onClick={onClick}
          />
        )
      )}
    </div>
  );
};

export default CardList;
