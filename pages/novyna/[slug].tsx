import classNames from "classnames/bind";
import {
  IconArrowDown,
  IconFacebook,
  IconTime,
  IconTwitter,
} from "components/Icons";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import { BREAKPOINT_LANDSCAPE, URL_MAP } from "constant";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
import Image from "next/image";
import Title from "components/UIKit/Title";
import SEO from "components/SEO";
import { useWidthCondition } from "helpers";
import getNewsBySlug, { GetNewsBySlugResponse } from "api/getNewsBySlug";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useMemo } from "react";
const cx = classNames.bind(styles);

type Props = {
  newsPostData: GetNewsBySlugResponse;
};

const PageNews = ({
  newsPostData: {
    title,
    annotation,
    content,
    publication_date,
    preview_photo,
    tags,
  },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    i18n: { language },
  } = useTranslation();
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat(language, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(publication_date));
  }, [publication_date, language]);

  const Actions = (
    <div className={cx("Actions")}>
      <Button
        color="sand"
        iconLeft={<IconArrowDown className={cx("BtnBackIcon")} />}
        tag="link"
        linkProps={{ href: URL_MAP.news }}
      />

      <Share title={title} />
    </div>
  );

  return (
    <main className={cx("Page")}>
      <SEO title={title} description={annotation} ogImage={preview_photo} />

      <Container className={cx("Container")}>
        {Actions}
        <div className={cx("Post")}>
          <time className={cx("Datetime")}>
            <IconTime /> {formattedDate}
          </time>

          <Title className={cx("Title")}>Title</Title>

          <ul className={cx("Tags")}>
            {tags.map((tag, i) => (
              <li key={i}>{tag.name}</li>
            ))}
          </ul>

          <img
            className={cx("CoverImage")}
            src={preview_photo}
          />

          <div
            className={cx("Content")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {Actions}
      </Container>
    </main>
  );
};

const Share = ({ title = "" }) => {
  const [t] = useTranslation();
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);
  const url =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";
  const fbLink = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}&t=${encodeURIComponent(title)}`;
  const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div className={cx("Share")}>
      <Button color="sand" iconLeft={<IconFacebook />} tag="a" href={fbLink}>
        {!isLandscapeOrLess && t("global.shareFB")}
      </Button>
      <Button
        color="sand"
        iconLeft={<IconTwitter />}
        tag="a"
        href={twitterLink}
      >
        {!isLandscapeOrLess && t("global.shareTwitter")}
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { slug: string }
> = async ({ locale, params: { slug } }) => {
  const newsPostData = await getNewsBySlug({
    locale: locale,
    slug,
  });

  if (newsPostData.error || !newsPostData.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      newsPostData: newsPostData.data,
    },
  };
};

export default PageNews;
