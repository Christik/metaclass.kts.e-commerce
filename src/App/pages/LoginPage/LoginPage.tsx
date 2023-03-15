import Title, { TitleSize } from "@components/Title";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Login
      </Title>
    </>
  );
};

export default LoginPage;
