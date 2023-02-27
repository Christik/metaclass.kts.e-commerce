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

export enum LoaderPosition {
  default = "default",
  centered = "centered",
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  type?: LoaderType;
  position?: LoaderPosition;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  className,
  size = LoaderSize.m,
  type = LoaderType.default,
  position = LoaderPosition.default,
  loading = true,
}) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      className={classnames(
        styles.loader,
        styles[`loader_size_${size}`],
        styles[`loader_type_${type}`],
        styles[`loader_position_${position}`],
        className
      )}
    >
      Loading...
    </div>
  );
};

export default Loader;
