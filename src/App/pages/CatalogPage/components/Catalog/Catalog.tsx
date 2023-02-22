import { useEffect, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader from "@components/Loader";
import Title from "@components/Title";
import { Product } from "@config/types";
import getProducts from "@services/products";

import styles from "./Catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const isLoading = products === null;

  useEffect(() => {
    const initProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    initProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <header className={styles.header}>
        <Title>Total product</Title>
        <Badge>{products.length}</Badge>
      </header>

      <CardList cards={products} />
    </section>
  );
};

export default Catalog;
