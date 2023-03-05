import Text from "@components/Text";
import Title, { TitleSize } from "@components/Title";

import styles from "./CatalogPage.module.scss";
import Catalog from "./components/Catalog";
import Filter from "./components/Filter";
import Search from "./components/Search";

const CatalogPage = () => {
  return (
    <>
      <header className={styles.header}>
        <Title size={TitleSize.l}>Products</Title>
        <Text className={styles["header__text"]}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </header>

      <div className={styles.panel}>
        <Search />
        <Filter className={styles.filter} />
      </div>

      <Catalog />
    </>
  );
};

export default CatalogPage;
