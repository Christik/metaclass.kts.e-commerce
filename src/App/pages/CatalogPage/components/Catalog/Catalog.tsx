import { useState } from "react";

import Badge from "@components/Badge";
import CardList from "@components/CardList";
import Title from "@components/Title";

import styles from "./Catalog.module.scss";

const testProducts = [
  {
    id: 0,
    image: "https://placeimg.com/640/480/any?r=0.9300320592588625",
    category: "Others",
    title: "Handmade fresh table",
    subtitle: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 1,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    subtitle: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 2,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    subtitle: "Andy shoes are designed to keeping in...",
    price: 687,
  },
];

const Catalog = () => {
  const [products] = useState(testProducts);

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
