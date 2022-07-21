import React, { useEffect } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Thumbs = ({
  photos,
  activeSlide,
  setActiveSlide,
  className = "",
}: {
  photos: string[];
  className?: string;
  activeSlide: number;
  setActiveSlide: (n: number) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const oneItemWidth = (
      ref.current.childNodes[0]?.childNodes[0] as HTMLDivElement
    )?.offsetWidth;

    ref.current.scrollTo({
      behavior: "smooth",
      left: activeSlide * oneItemWidth,
    });
  }, [activeSlide]);

  return (
    <div className={cx("SliderThumbs", className)} ref={ref}>
      <div className={cx("SliderThumbsList")}>
        {photos.map((photo, i) => {
          if (!photo) return null;

          return (
            <div
              className={cx("SliderThumbsSlide", i === activeSlide && "active")}
              key={i}
            >
              <button onClick={() => setActiveSlide(i)} type="button">
                <img
                  src={photo}
                  alt=""
                  onError={(e) => (e.currentTarget.style.opacity = "0")}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Thumbs;
