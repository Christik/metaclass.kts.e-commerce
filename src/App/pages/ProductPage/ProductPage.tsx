import { useEffect, useState } from "react";

import Loader from "@components/Loader";
import { Product } from "@config/types";
import { getProduct } from "@store/product";
import { getProductsByCategory } from "@store/products";
import { useParams } from "react-router-dom";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";

const RELATED_LIMIT = 3;

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const isLoading = product === null || relatedProducts === null;

  useEffect(() => {
    const initProduct = async (id: number) => {
      const data = await getProduct(id);
      setProduct(data);
    };

    initProduct(productId);
  }, [productId]);

  useEffect(() => {
    if (product) {
      const initRelatedProducts = async () => {
        const data = await getProductsByCategory(
          product.category.id,
          RELATED_LIMIT
        );
        setRelatedProducts(data);
      };

      initRelatedProducts();
    }
  }, [product]);

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

      <RelatedItems
        className={styles.relatedItems}
        products={relatedProducts}
      />
    </>
  );
};

export default ProductPage;
