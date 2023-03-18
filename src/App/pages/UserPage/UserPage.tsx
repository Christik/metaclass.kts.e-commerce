import { FC } from "react";

import Title, { TitleSize } from "@components/Title";
import rootStore from "@store/RootStore/instance";

import UserCard from "./components/UserCard";
import styles from "./UserPage.module.scss";

const UserPage: FC = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Profile
      </Title>

      <UserCard
        avatar={rootStore.auth.user.avatar}
        name={rootStore.auth.user.name}
        email={rootStore.auth.user.email}
      />
    </>
  );
};

export default UserPage;
