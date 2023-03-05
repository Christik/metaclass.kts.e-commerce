import { useEffect } from "react";

import Loader, { LoaderPosition } from "@components/Loader";
import ProductDetailStore from "@store/ProductDetailStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Gallery from "./components/Gallery";
import Info from "./components/Info";
import RelatedItems from "./components/RelatedItems";
import styles from "./ProductPage.module.scss";
import NotFoundPage from "../NotFoundPage";

const ProductPage = () => {
  const productDetailStore = useLocalStore(() => new ProductDetailStore());

  const isLoading = productDetailStore.meta === Meta.loading;
  const isError = productDetailStore.meta === Meta.error;
  const isSuccess = productDetailStore.meta === Meta.success;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const initProduct = async (id: string) => {
      await productDetailStore.getProductDetail(String(id));
    };

    if (id) {
      initProduct(id);
    }
  }, [id, productDetailStore]);

  return (
    <>
      {isError && <NotFoundPage />}

      {isLoading && <Loader position={LoaderPosition.centered} />}

      {isSuccess && (
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
