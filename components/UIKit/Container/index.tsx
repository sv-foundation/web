import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const Container: FC<JSX.IntrinsicElements["div"]> = ({
  className,
  ...props
}) => {
  return <div className={cx("Component", className)} {...props} />;
};

export default Container;
