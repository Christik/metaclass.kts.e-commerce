import { useEffect, useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Loader from "@components/Loader";
import Title from "@components/Title";
import { ROUTS } from "@config/routs";
import { Product } from "@config/types";
import { getAllProducts } from "@services/products";
import { generatePath, useNavigate } from "react-router-dom";

import styles from "./Catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const navigate = useNavigate();
  const isLoading = products === null;

  useEffect(() => {
    const initProducts = async () => {
      const data = await getAllProducts();

      const updatedData = data.map((product: Product) => {
        product.onClick = () =>
          navigate(generatePath(ROUTS.PRODUCT, { id: product.id }));
        return product;
      });

      setProducts(updatedData);
    };

    initProducts();
  }, [navigate]);

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
