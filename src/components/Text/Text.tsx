import { FC, PropsWithChildren, memo } from "react";

import classnames from "classnames";

import styles from "./Text.module.scss";

type TextProps = PropsWithChildren<{
  className?: string;
}>;

const Text: FC<TextProps> = ({ className, children }) => {
  return <p className={classnames(styles.text, className)}>{children}</p>;
};

export default memo(Text);
