import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <>
      <Title className={styles.title} size={TitleSize.l}>
        Error 404
      </Title>
      <Text className={styles.text}>Page not found</Text>
    </>
  );
};

export default NotFoundPage;
