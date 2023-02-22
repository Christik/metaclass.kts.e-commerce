import { PropsWithChildren, FC } from "react";

import Loader from "@components/Loader";

import styles from "./WithLoader.module.scss";

type WithLoaderProps = PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader: FC<WithLoaderProps> = (props) => {
  const { children, loading } = props;

  return (
    <div className={styles.withLoader}>
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
