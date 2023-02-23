import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { Product } from "@config/types";
import getProduct from "@services/product";
import { useParams } from "react-router-dom";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [relatedProducts] = useState(null);

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

  const { title, description, price, images } = product;

  return (
    <>
      <div className={styles.content}>
        <Gallery className={styles.gallery} image={images[0]} alt={title} />

        <Info title={title} description={description} price={price} />
      </div>

      {relatedProducts && (
        <RelatedItems
          className={styles.relatedItems}
          products={relatedProducts}
        />
      )}
    </>
  );
};

export default ProductPage;
