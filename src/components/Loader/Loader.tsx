import React from "react";

import classnames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export enum LoaderType {
  default = "default",
  inverted = "inverted",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  type?: LoaderType;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = (props) => {
  const {
    className,
    size = LoaderSize.m,
    type = LoaderType.default,
    loading = true,
  } = props;

  if (!loading) {
    return null;
  }

  return (
    <div
      className={classnames(
        styles.loader,
        styles[size],
        styles[type],
        className
      )}
    >
      Loading...
    </div>
  );
};
