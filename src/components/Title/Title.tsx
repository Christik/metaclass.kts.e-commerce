import { ElementType, FC, PropsWithChildren } from "react";

import classnames from "classnames";

import styles from "./Title.module.scss";

export enum TitleSize {
  xs = "xs",
  s = "s",
  m = "m",
  l = "l",
}

const TagMap = {
  xs: "h4",
  s: "h3",
  m: "h2",
  l: "h1",
};

type TitleProps = PropsWithChildren<{
  size?: TitleSize;
  as?: ElementType;
  className?: string;
}>;

const Title: FC<TitleProps> = ({
  size = TitleSize.m,
  as,
  className,
  children,
}) => {
  const Tag = as ?? TagMap[size];

  return (
    <Tag className={classnames(styles.title, styles[size], className)}>
      {children}
    </Tag>
  );
};

export default Title;
