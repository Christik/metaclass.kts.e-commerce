import { FC } from "react";

import classnames from "classnames";

import styles from "./Icon.module.scss";

export enum IconType {
  user = "user",
  search = "search",
  email = "email",
  lock = "lock",
}

export enum IconColor {
  secondary = "secondary",
  accent = "accent",
  error = "error",
  warning = "warning",
}

type IconProps = {
  className?: string;
  type: IconType;
  color?: IconColor | null;
};

const Icon: FC<IconProps> = ({ className, type, color }) => {
  return (
    <i
      className={classnames(
        styles.icon,
        [styles[`icon_${type}`]],
        { [styles[`icon_${color}`]]: color },
        className
      )}
    ></i>
  );
};

export default Icon;
