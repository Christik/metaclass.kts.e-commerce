import { FC } from "react";

import Text from "@components/Text";
import Title from "@components/Title";

import styles from "./Info.module.scss";

type InfoProps = {
  title: string;
  description: string;
  price: number;
};

const Info: FC<InfoProps> = (props) => {
  const { title, description, price } = props;

  return (
    <div className={styles.info}>
      <Title as="h1">{title}</Title>
      <Text className={styles.description}>{description}</Text>
      <Title className={styles.price} as="p">
        ${price}
      </Title>
    </div>
  );
};

export default Info;
