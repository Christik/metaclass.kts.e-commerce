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
}>;

const Title: FC<TitleProps> = (props) => {
  const { size = TitleSize.m, as, children } = props;
  const Tag = as ?? TagMap[size];

  return (
    <Tag className={classnames(styles.title, styles[size])}>{children}</Tag>
  );
};

export default Title;
