import { FC, PropsWithChildren } from "react";

import styles from "./Text.module.scss";

type TextProps = PropsWithChildren;

const Text: FC<TextProps> = ({ children }) => {
  return <p className={styles.text}>{children}</p>;
};

export default Text;
