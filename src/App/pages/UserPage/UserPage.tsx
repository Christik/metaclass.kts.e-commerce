import Title, { TitleSize } from "@components/Title";

import UserCard from "./components/UserCard";
import styles from "./UserPage.module.scss";

const UserPage = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Profile
      </Title>
      <UserCard
        avatar="https://api.lorem.space/image/face?w=640&h=480&r=867"
        name="Christik"
        email="christik@site.ru"
      />
    </>
  );
};

export default UserPage;
