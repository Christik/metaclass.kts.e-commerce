import { FC, memo } from "react";

import Card from "@components/Card";
import { ROUTS } from "@config/routs";
import { ProductModel } from "@store/models/product";
import { generatePath, useNavigate } from "react-router";

import styles from "./CardList.module.scss";

type CardListProps = {
  cards: ProductModel[];
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
