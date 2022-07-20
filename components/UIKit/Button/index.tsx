import React, { memo, ReactNode } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import Link, { LinkProps } from "next/link";
const cx = classNames.bind(styles);

export const COLORS = [
  "primary",
  "primary-outline",
  "secondary",
  "sand",
  "grey",
] as const;

export type ButtonProps = {
  /** @default button*/
  tag?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonPropsLink = {
  tag: "link";
  linkProps: LinkProps;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonPropsAnchor = {
  tag: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type Props = {
  /**
   * Available color schemas
   */
  color: typeof COLORS[number];
  /**
   * Highlight button as hovered
   */
  isActive?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
} & (ButtonProps | ButtonPropsLink | ButtonPropsAnchor);

const Button = memo(
  ({
    color,
    isActive,
    className,
    tag = "button",
    children,
    iconRight,
    iconLeft,
    ...rest
  }: Props) => {
    const props = {
      className: cx("Btn", className, {
        [color]: true,
        active: isActive,
        iconOnly:
          !children && ((iconRight && !iconLeft) || (iconLeft && !iconRight)),
      }),
      disabled: (rest as ButtonProps).disabled,
      children: (
        <span tabIndex={-1}>
          {iconLeft && <span className={cx("Icon", "left")}>{iconLeft}</span>}
          {children}
          {iconRight && (
            <span className={cx("Icon", "right")}>{iconRight}</span>
          )}
        </span>
      ),
    };

    if (tag === "a") {
      return <a {...props} {...(rest as ButtonPropsAnchor)} />;
    } else if (tag === "link") {
      const { linkProps, ...anchorProps } = rest as ButtonPropsLink;
      return (
        <Link {...linkProps}>
          <a {...props} {...anchorProps} />
        </Link>
      );
    } else {
      return <button {...props} {...(rest as ButtonProps)} />;
    }
  }
);
export default Button;
