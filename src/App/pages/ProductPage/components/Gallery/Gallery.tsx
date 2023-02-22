import { FC } from "react";

import classnames from "classnames";

import styles from "./Gallery.module.scss";

type GalleryProps = {
  className?: string;
};

const Gallery: FC<GalleryProps> = ({ className }) => {
  return (
    <div className={classnames(styles.gallery, className)}>
      <img
        src="https://placeimg.com/640/480/any?r=0.9178516507833767"
        alt="gallery"
      />
    </div>
  );
};

export default Gallery;
