import { FC, useRef, memo, useCallback } from "react";

import classnames from "classnames";
import { Navigation } from "swiper";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";

import styles from "./Gallery.module.scss";

import "swiper/css";

type GalleryProps = {
  className?: string;
  images: string[];
  alt: string;
};

const Gallery: FC<GalleryProps> = ({ className, images, alt }) => {
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);

  const hasNavigation = images.length > 1;

  const onBeforeInit = useCallback(({ params: { navigation } }: SwiperType) => {
    if (navigation) {
      (navigation as NavigationOptions).prevEl = navigationPrevRef.current;
      (navigation as NavigationOptions).nextEl = navigationNextRef.current;
    }
  }, []);

  return (
    <div className={classnames(styles.gallery, className)}>
      <Swiper
        className={styles.slider}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={onBeforeInit}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img className={styles.image} src={image} alt={alt} />
          </SwiperSlide>
        ))}

        {hasNavigation && (
          <>
            <button
              type="button"
              className={styles.prev}
              ref={navigationPrevRef}
            >
              Previous
            </button>

            <button
              type="button"
              className={styles.next}
              ref={navigationNextRef}
            >
              Next
            </button>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default memo(Gallery);
