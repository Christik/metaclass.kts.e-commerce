import { useEffect, useState } from "react";

import Loader, { LoaderPosition } from "@components/Loader";
import { ProductModel } from "@store/models/product";
import { getProduct } from "@store/product";
import { getProductsByCategory } from "@store/products";
import { useParams } from "react-router-dom";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";
import NotFoundPage from "../NotFoundPage";

const RELATED_LIMIT = 3;

const ProductPage = () => {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[] | null>(
    null
  );
  const [isError, setIsError] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const isLoading = product === null || relatedProducts === null;

  useEffect(() => {
    const initProduct = async (id: number) => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        setIsError(true);
      }
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

  if (isError) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loader position={LoaderPosition.centered} />;
  }

  const { title, description, price, images } = product;

  return (
    <>
      <div className={styles.content}>
        <Gallery className={styles.gallery} images={images} alt={title} />

        <Info title={title} description={description} price={price} />
      </div>

      <RelatedItems
        className={styles["related-items"]}
        products={relatedProducts}
      />
    </>
  );
};

export default ProductPage;
