import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";

import styles from "./CatalogPage.module.scss";
import Catalog from "./components/Catalog";

const CatalogPage = () => {
  return (
    <>
      <header className={styles.header}>
        <Title size={TitleSize.l}>Products</Title>
        <Text className={styles.headerText}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </header>

      <Catalog />
    </>
  );
};

export default CatalogPage;
