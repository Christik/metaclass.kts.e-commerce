import { FC, FormEvent, useCallback, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";
import { ROUTS } from "@config/routs";
import rootStore from "@store/RootStore/instance";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();

      await rootStore.auth.login(email, password);

      if (rootStore.auth.isError) {
        toast.error("We cannot find an account with that email and password");
      }

      if (rootStore.auth.isSuccess) {
        navigate(ROUTS.USER);
      }
    },
    [email, password]
  );

  if (rootStore.auth.isAuthorized) {
    return <Navigate to={ROUTS.INDEX} />;
  }

  return (
    <>
      <div className={styles.header}>
        <Title size={TitleSize.l}>Login</Title>

        <div className={styles.tip}>
          <Text>Valid e-mail: john@mail.com</Text>
          <Text>Valid password: changeme</Text>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          className={styles.field}
          placeholder="E-mail"
          onChange={(value) => setEmail(value)}
        />

        <Input
          className={styles.field}
          type="password"
          placeholder="Password"
          onChange={(value) => setPassword(value)}
        />

        <Button type="submit" isLoading={rootStore.auth.isLoading} isBlock>
          Login
        </Button>
      </form>
    </>
  );
};

export default observer(LoginPage);
