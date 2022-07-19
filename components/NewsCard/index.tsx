import classNames from "classnames/bind";
import { IconTime } from "components/Icons";
import { URL_MAP } from "constant";
import { FC, useMemo } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  slug: string;
  date: string;
  title: string;
  preview: string;
  text: string;
  tag?: "li" | "div";
};

const NewsCard: FC<Props> = ({
  slug,
  date,
  title,
  preview,
  text,
  tag: Tag = "li",
}) => {
  const {
    i18n: { language },
  } = useTranslation();
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(language, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }, [date, language]);

  return (
    <Tag className={cx("Component")}>
      <Link href={URL_MAP.newsPost(slug)}>
        <a>
          <div className={cx("Preview")}>
            <img src={preview} alt="" />
          </div>

          <time>
            <IconTime />
            {formattedDate}
          </time>
          <h5>{title}</h5>
          <p>{text}</p>
        </a>
      </Link>
    </Tag>
  );
};

export default NewsCard;
