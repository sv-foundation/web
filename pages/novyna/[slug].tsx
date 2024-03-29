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
import Title from "components/UIKit/Title";
import SEO from "components/SEO";
import { useWidthCondition } from "helpers";
import getNewsBySlug, { GetNewsBySlugResponse } from "api/getNewsBySlug";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  FC,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import Gallery from "components/Gallery";
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
    main_photo,
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

  const [postImages, setPostImages] = useState<HTMLElement[]>([]);
  const [postImagesSrc, setPostImagesSrc] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [gallery, setGallery] = useState({ show: false, index: 0 });

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

  useEffect(() => {
    if (contentRef.current) {
      const imagesQuery = contentRef.current.querySelectorAll("img");
      const images: HTMLElement[] = [];
      const imagesSrc: string[] = [];

      imagesQuery.forEach((img) => {
        images.push(img);
        imagesSrc.push(img.src);
      });

      setPostImages(images);
      setPostImagesSrc(imagesSrc);
    }
  }, []);

  const onClickContent: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target && (e.target as HTMLElement).tagName === "IMG") {
      const index = postImages.indexOf(e.target as HTMLElement);
      setGallery({
        show: true,
        index,
      });
    }
  };

  return (
    <main className={cx("Page")}>
      <SEO title={title} description={annotation} ogImage={main_photo} />

      <Container className={cx("Container")}>
        {Actions}
        <div className={cx("Post")}>
          <time className={cx("Datetime")}>
            <IconTime /> {formattedDate}
          </time>

          <Title className={cx("Title")}>{title}</Title>

          <ul className={cx("Tags")}>
            {tags.map((tag, i) => (
              <li key={i}>{tag.name}</li>
            ))}
          </ul>

          <div className={cx("CoverImage")}>
            <img src={main_photo} />
          </div>

          <div
            ref={contentRef}
            onClick={onClickContent}
            className={cx("Content")}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        {Actions}

        {gallery.show && (
          <Gallery
            initialSlide={gallery.index}
            close={() => setGallery({ show: false, index: 0 })}
            photos={postImagesSrc}
          />
        )}
      </Container>
    </main>
  );
};

const Share: FC<{ title: string }> = ({ title }) => {
  const [t] = useTranslation();
  const router = useRouter();

  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);
  const url = process.env.NEXT_PUBLIC_CLIENT_URL + router.asPath;
  const fbLink = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    url
  )}&t=${encodeURIComponent(title)}`;
  const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div className={cx("Share")}>
      <Button
        color="sand"
        iconLeft={<IconFacebook />}
        target="_blank"
        tag="a"
        href={fbLink}
      >
        {!isLandscapeOrLess && t("global.shareFB")}
      </Button>
      <Button
        color="sand"
        iconLeft={<IconTwitter />}
        target="_blank"
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
> = async ({ locale, params }) => {
  const newsPostData = await getNewsBySlug({
    locale: locale as string,
    slug: params?.slug ?? "",
  });

  if (newsPostData.error || !newsPostData.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      newsPostData: newsPostData.data,
    },
  };
};

export default PageNews;
