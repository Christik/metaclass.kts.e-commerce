import { FC } from "react";

import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";

import styles from "./UserCard.module.scss";

type UserCardProps = {
  avatar: string;
  name: string;
  email?: string;
};

const UserCard: FC<UserCardProps> = ({ avatar, name, email }) => {
  return (
    <div className={styles.user}>
      <img className={styles.avatar} src={avatar} alt={name} />

      <div className={styles.content}>
        <Title size={TitleSize.xs}>{name}</Title>
        {email && <Text>{email}</Text>}
      </div>
    </div>
  );
};

export default UserCard;
