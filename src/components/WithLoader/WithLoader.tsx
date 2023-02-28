import { PropsWithChildren, FC } from "react";

import Loader from "@components/Loader";

import styles from "./WithLoader.module.scss";

type WithLoaderProps = PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: FC<WithLoaderProps> = ({ children, loading }) => {
  return (
    <div className={styles["with-loader"]}>
      {children}

      {loading && (
        <div className={styles.icon}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default WithLoader;
