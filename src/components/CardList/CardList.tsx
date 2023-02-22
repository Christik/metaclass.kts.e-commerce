import { FC } from "react";

import Card, { CardProps } from "@components/Card";

import styles from "./CardList.module.scss";

type CardListItem = CardProps & {
  id: number;
};

type CardListProps = {
  cards: CardListItem[];
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
