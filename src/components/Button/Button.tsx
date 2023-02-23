import { PropsWithChildren, FC, ButtonHTMLAttributes } from "react";

import Loader, { LoaderSize, LoaderType } from "@components/Loader";
import classnames from "classnames";

import styles from "./Button.module.scss";

type ButtonProps = PropsWithChildren<{
  loading?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  const { className, children, disabled, loading, ...attrs } = props;

  return (
    <button
      className={classnames(
        styles.button,
        {
          [styles.disabled]: disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...attrs}
    >
      {loading && (
        <Loader
          className={styles.loader}
          size={LoaderSize.s}
          type={LoaderType.inverted}
        />
      )}

      {children}
    </button>
  );
};

export default Button;