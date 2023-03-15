import Input from "@components/Input";
import Title, { TitleSize } from "@components/Title";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Login
      </Title>

      <form>
        <Input onChange={() => {}} />
      </form>
    </>
  );
};

export default LoginPage;
