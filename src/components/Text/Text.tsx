import { FC, PropsWithChildren } from "react";

import classnames from "classnames";

import styles from "./Text.module.scss";

type TextProps = PropsWithChildren<{
  className?: string;
}>;

const Text: FC<TextProps> = (props) => {
  const { className, children } = props;

  return <p className={classnames(styles.text, className)}>{children}</p>;
};

export default Text;
