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

export enum IconSize {
  s = "s",
  m = "m",
  l = "l",
}

type IconProps = {
  className?: string;
  type: IconType;
  color?: IconColor | null;
  size?: IconSize | null;
};

const Icon: FC<IconProps> = ({ className, type, color, size = IconSize.m }) => {
  return (
    <i
      className={classnames(
        styles.icon,
        [styles[`icon_${type}`]],
        { [styles[`icon_${color}`]]: color },
        { [styles[`icon_size-${size}`]]: size },
        className
      )}
    ></i>
  );
};

export default Icon;
