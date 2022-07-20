import React, { FC } from 'react'
import classNames from "classnames/bind";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

type Props = JSX.IntrinsicElements['h1'] & { 
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Title: FC<Props> = ({ tag: Tag = 'h1', className, ...props}) => {
  return <Tag className={cx('Component', className)} {...props} />
}

export default Title