import { FC } from "react";

import classnames from "classnames";

import styles from "./Gallery.module.scss";

type GalleryProps = {
  className?: string;
  image: string;
  alt: string;
};

const Gallery: FC<GalleryProps> = (props) => {
  const { className, image, alt } = props;

  return (
    <div className={classnames(styles.gallery, className)}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default Gallery;
