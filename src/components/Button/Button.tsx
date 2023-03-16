import { PropsWithChildren, FC, ButtonHTMLAttributes, memo } from "react";

import Loader, { LoaderSize, LoaderType } from "@components/Loader";
import classnames from "classnames";

import styles from "./Button.module.scss";

type ButtonProps = PropsWithChildren<{
  isLoading?: boolean;
  isBlock?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  isLoading,
  isBlock,
  ...attrs
}) => {
  return (
    <button
      className={classnames(
        styles.button,
        {
          [styles["button_disabled"]]: disabled || isLoading,
        },
        {
          [styles["button_block"]]: isBlock,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...attrs}
    >
      {isLoading && (
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

export default memo(Button);
