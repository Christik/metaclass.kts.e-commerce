import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { Product } from "@config/types";
import getProduct from "@services/product";
import { useParams } from "react-router-dom";

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
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 1,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
  {
    id: 2,
    image: "https://placeimg.com/640/480/any?r=0.9178516507833767",
    category: "Others",
    title: "Handmade fresh table",
    description: "Andy shoes are designed to keeping in...",
    price: 687,
  },
];

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [relatedProducts] = useState(testProducts);

  const isLoading = product === null;

  useEffect(() => {
    const initProduct = async (id: number) => {
      const data = await getProduct(id);
      setProduct(data);
    };

    initProduct(Number(id));
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  const { title, description, price, image } = product;

  return (
    <>
      <div className={styles.content}>
        <Gallery className={styles.gallery} image={image} alt={title} />

        <Info title={title} description={description} price={price} />
      </div>

      <RelatedItems
        className={styles.relatedItems}
        products={relatedProducts}
      />
    </>
  );
};

export default ProductPage;
