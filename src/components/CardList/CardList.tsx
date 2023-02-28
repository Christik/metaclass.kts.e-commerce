import { FC, memo } from "react";

import Card from "@components/Card";
import { ROUTS } from "@config/routs";
import { Product } from "@config/types";
import { generatePath, useNavigate } from "react-router";

import styles from "./CardList.module.scss";

type CardListProps = {
  cards: Product[];
};

const CardList: FC<CardListProps> = ({ cards }) => {
  const navigate = useNavigate();

  return (
    <div className={styles["card-list"]}>
      {cards.map(({ id, images, category, title, description, price }) => {
        const clickHandler = () => {
          navigate(generatePath(ROUTS.PRODUCT, { id }));
        };

        return (
          <Card
            key={id}
            image={images[0]}
            category={category.name}
            title={title}
            subtitle={description}
            price={price}
            onClick={clickHandler}
          />
        );
      })}
    </div>
  );
};

export default memo(CardList);
