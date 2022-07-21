import React, { Fragment, useEffect, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper";
import "swiper/css";
import Button from "components/UIKit/Button";
import { IconArrowDown } from "components/Icons";

const cx = classNames.bind(styles);

const Slider = ({
  photos,
  activeSlide,
  setActiveSlide,
  sliderClassName = "",
  slideClassName = "",
  openGallery,
  ...sliderProps
}: {
  photos: string[];
  activeSlide?: number;
  setActiveSlide?: (n: number) => void;
  sliderClassName?: string;
  slideClassName?: string;
  openGallery?(v: number): void;
}) => {
  const [swiper, setSwiper] = useState<SwiperClass>();

  useEffect(() => {
    if (activeSlide === undefined) return;
    setTimeout(() => swiper?.slideTo(activeSlide), 50);
  }, [activeSlide]);

  return (
    <Fragment>
      <Button
        onClick={() => swiper?.slidePrev()}
        className={cx("BtnControl", "prev")}
        iconLeft={<IconArrowDown />}
        disabled={activeSlide === 0}
        color="secondary"
      />
      <Swiper
        className={sliderClassName}
        onSlideChange={(swiper) => setActiveSlide?.(swiper.activeIndex)}
        onSwiper={setSwiper}
        slidesPerView={1}
        {...sliderProps}
      >
        {photos.map((src, index) => {
          return (
            <SwiperSlide key={src + index} className={slideClassName}>
              <div>
                <img
                  src={src}
                  alt=""
                  onError={(e) => (e.currentTarget.style.opacity = "0")}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button
        className={cx("BtnControl", "next")}
        iconLeft={<IconArrowDown />}
        onClick={() => swiper?.slideNext()}
        color="secondary"
        disabled={activeSlide === photos.length - 1}
      />
    </Fragment>
  );
};

export default Slider;
