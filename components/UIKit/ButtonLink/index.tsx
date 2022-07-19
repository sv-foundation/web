import classNames from "classnames/bind";
import React, { memo, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

export type ButtonProps = {
  /** @default button*/
  tag?: "button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonPropsLink = {
  tag: "link";
  linkProps: LinkProps;
} & React.ButtonHTMLAttributes<HTMLAnchorElement>;

export type ButtonPropsAnchor = {
  tag: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type Props = (ButtonProps | ButtonPropsLink | ButtonPropsAnchor) & {
  fontWeight?: "bold" | "medium";
  color?: "dark" | "green";
};

const ButtonLink = memo(
  ({
    className,
    tag = "button",
    children,
    color = "dark",
    fontWeight = "medium",
    ...rest
  }: Props) => {
    const props = {
      className: cx("Btn", className, color, fontWeight),
      children: <span tabIndex={-1}>{children as ReactNode}</span>,
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
export default ButtonLink;
