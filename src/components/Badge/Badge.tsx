import { FC, PropsWithChildren } from "react";

import styles from "./Badge.module.scss";

type BadgeProps = PropsWithChildren;

const Badge: FC<BadgeProps> = ({ children }) => {
  return <div className={styles.badge}>{children}</div>;
};

export default Badge;
