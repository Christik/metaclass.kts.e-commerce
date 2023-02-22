import { useState } from "react";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";

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

const ProductPage = () => {
  const [products] = useState(testProducts);

  return (
    <>
      <div className={styles.content}>
        <Gallery className={styles.gallery} />

        <Info
          title="White Aesthetic Chair"
          description="Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support"
          price={99.98}
        />
      </div>

      <RelatedItems className={styles.relatedItems} products={products} />
    </>
  );
};

export default ProductPage;
