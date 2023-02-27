import { FC, PropsWithChildren, memo } from "react";

import styles from "./Badge.module.scss";

type BadgeProps = PropsWithChildren;

const Badge: FC<BadgeProps> = ({ children }) => {
  return <div className={styles.badge}>{children}</div>;
};

export default memo(Badge);
