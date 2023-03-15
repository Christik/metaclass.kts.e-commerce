import Button from "@components/Button";
import Input from "@components/Input";
import Title, { TitleSize } from "@components/Title";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Login
      </Title>

      <form className={styles.form}>
        <Input
          className={styles.field}
          placeholder="E-mail"
          onChange={() => {}}
        />

        <Input
          className={styles.field}
          type="password"
          placeholder="Password"
          onChange={() => {}}
        />

        <Button type="submit" isBlock>
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
