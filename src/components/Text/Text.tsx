import { FC, PropsWithChildren, memo } from "react";

import classnames from "classnames";

import styles from "./Text.module.scss";

export enum TextType {
  error = "error",
  warning = "warning",
}

type TextProps = PropsWithChildren<{
  className?: string;
  type?: TextType;
}>;

const Text: FC<TextProps> = ({ className, type, children }) => {
  return (
    <p
      className={classnames(
        styles.text,
        { [styles[`text_${type}`]]: type },
        className
      )}
    >
      {children}
    </p>
  );
};

export default memo(Text);
