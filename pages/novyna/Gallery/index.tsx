import classNames from "classnames/bind";
import { IconClose } from "components/Icons";
import Button from "components/UIKit/Button";
import { useOverflowController } from "helpers";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import Slider from "./Slider";
import Thumbs from "./Thumbs";
const cx = classNames.bind(styles);

const Gallery = ({
  close,
  initialSlide,
  photos,
}: {
  initialSlide: number;
  close(): void;
  photos: string[];
}) => {
  const overflowController = useOverflowController();
  const ref = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(initialSlide);

  const hide = () => {
    close();
    overflowController.unblockScroll();
  };

  useEffect(() => {
    overflowController.blockScroll(ref.current!);
    const onPressEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    window.addEventListener("keydown", onPressEsc);

    return () => {
      window.removeEventListener("keydown", onPressEsc);
      overflowController.unblockScroll();
    };
  }, []);

  return (
    <aside ref={ref} className={cx("Component")}>
      <header className={cx("Header")}>
        <span />
        <Button color="secondary" iconLeft={<IconClose />} onClick={hide} />
      </header>
      <main className={cx("Main")}>
        <Slider
          sliderClassName={cx("Slider")}
          slideClassName={cx("SliderSlide")}
          photos={photos}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </main>
      <footer className={cx("Footer")}>
        <Thumbs
          className={cx("SliderThumbs")}
          photos={photos}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </footer>
    </aside>
  );
};

export default Gallery;
