import { ReactNode, MouseEventHandler, FC } from "react";

import classnames from "classnames";

import styles from "./Card.module.scss";

type CardProps = {
  image: string;
  category?: string;
  title: string;
  subtitle: string;
  price?: ReactNode;
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
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      {price && <div className={styles.price}>{price}</div>}
    </article>
  );
};

export default Card;
