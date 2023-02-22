import { ReactNode, MouseEventHandler, FC } from "react";

import styles from "./Card.module.scss";

type CardProps = {
  image: string;
  category?: string;
  title: ReactNode;
  subtitle: ReactNode;
  content?: ReactNode;
  onClick?: MouseEventHandler;
};

const Card: FC<CardProps> = (props) => {
  const { image, category, title, subtitle, content, onClick } = props;

  return (
    <article className={styles.card} onClick={onClick}>
      <img className={styles.preview} src={image} alt="" />
      {category && <p className={styles.category}>{category}</p>}
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      {content && <div className={styles.content}>{content}</div>}
    </article>
  );
};

export default Card;
