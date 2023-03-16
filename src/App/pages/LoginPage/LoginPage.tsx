import { FC, FormEvent, useCallback, useState } from "react";

import Button from "@components/Button";
import { IconType } from "@components/Icon";
import Input, { InputStatus } from "@components/Input";
import Text from "@components/Text";
import { TextType } from "@components/Text/Text";
import Title, { TitleSize } from "@components/Title";
import { ROUTS } from "@config/routs";
import rootStore from "@store/RootStore/instance";
import { getEmailError, getPasswordError } from "@utils/validator";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./LoginPage.module.scss";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      evt.preventDefault();

      setEmailError(getEmailError(email));
      setPasswordError(getPasswordError(password));

      if (getEmailError(email) || getPasswordError(password)) {
        return;
      }

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

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <Input
            type="email"
            placeholder="E-mail"
            status={emailError ? InputStatus.error : null}
            icon={IconType.email}
            onChange={(value) => setEmail(value)}
          />

          {emailError && <Text type={TextType.error}>{emailError}</Text>}
        </div>

        <div className={styles.field}>
          <Input
            type="password"
            placeholder="Password"
            status={passwordError ? InputStatus.error : null}
            icon={IconType.lock}
            onChange={(value) => setPassword(value)}
          />

          {passwordError && <Text type={TextType.error}>{passwordError}</Text>}
        </div>

        <Button type="submit" isLoading={rootStore.auth.isLoading} isBlock>
          Login
        </Button>
      </form>
    </>
  );
};

export default observer(LoginPage);
