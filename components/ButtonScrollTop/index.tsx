import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { IconArrowDown } from "components/Icons";
const cx = classNames.bind(styles);

const ButtonScrollTop = () => {
  const [show, setShow] = useState(false);

  const onClick = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button onClick={onClick} className={cx("Btn", { show })}>
      <IconArrowDown />
    </button>
  );
};

export default ButtonScrollTop;
