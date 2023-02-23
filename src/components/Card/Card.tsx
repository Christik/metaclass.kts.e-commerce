import { MouseEventHandler, FC } from "react";

import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";
import classnames from "classnames";

import styles from "./Card.module.scss";

export type CardProps = {
  image: string;
  category?: string;
  title: string;
  subtitle: string;
  price?: number;
  onClick?: MouseEventHandler;
};

const Card: FC<CardProps> = (props) => {
  const { image, category, title, subtitle, price, onClick } = props;

  return (
    <article
      className={classnames(styles.card, { [styles.clickable]: onClick })}
      onClick={onClick}
    >
      <img className={styles.preview} src={image} alt={title} />

      {category && <p className={styles.category}>{category}</p>}

      <Title className={styles.title} size={TitleSize.xs} as="p">
        {title}
      </Title>

      <Text className={styles.description}>{subtitle}</Text>

      {price && <div className={styles.price}>${price}</div>}
    </article>
  );
};

export default Card;
