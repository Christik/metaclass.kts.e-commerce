import { FC, useEffect } from "react";

import Loader, { LoaderPosition } from "@components/Loader";
import ProductDetailStore from "@store/ProductDetailStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";
import NotFoundPage from "../NotFoundPage";

const ProductPage: FC = () => {
  const productDetailStore = useLocalStore(() => new ProductDetailStore());

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      productDetailStore.getProductDetail(String(id));
    }
  }, [id, productDetailStore]);

  return (
    <>
      {productDetailStore.isError && <NotFoundPage />}

      {productDetailStore.isLoading && (
        <Loader position={LoaderPosition.centered} />
      )}

      {productDetailStore.isSuccess && (
        <>
          <div className={styles.content}>
            <Gallery
              className={styles.gallery}
              images={productDetailStore.product.images}
              alt={productDetailStore.product.title}
            />

            <Info
              title={productDetailStore.product.title}
              description={productDetailStore.product.description}
              price={productDetailStore.product.price}
            />
          </div>

          <RelatedItems
            className={styles["related-items"]}
            category={productDetailStore.product.category}
          />
        </>
      )}
    </>
  );
};

export default observer(ProductPage);
