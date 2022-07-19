import classNames from "classnames/bind";
import NewsCard from "components/NewsCard";
import Pagination from "components/Pagination";
import SEO from "components/SEO";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const PageNews = () => {
  const [t] = useTranslation();

  const onSelectTag = (tag: string) => {};

  return (
    <main className={cx("Page")}>
      <SEO
        title={t("pageNews.seo.title")}
        description={t("pageNews.seo.title")}
      />

      <Container className={cx("Container")}>
        <h1 className={cx("Title")}>{t("pageNews.title")}</h1>

        <div className={cx("Tags")}>
          <Button color="primary" onClick={() => onSelectTag("all")}>
            {t("pageNews.tags.all")}
          </Button>

          <Button color="grey" onClick={() => onSelectTag("all")}>
            {t("pageNews.tags.all")}
          </Button>
          <Button color="grey" onClick={() => onSelectTag("all")}>
            {t("pageNews.tags.all")}
          </Button>
          <Button color="grey" onClick={() => onSelectTag("all")}>
            {t("pageNews.tags.all")}
          </Button>
        </div>

        <ul className={cx("NewsList")}>
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
          <NewsCard
            title="title"
            text="text"
            preview="/images/home_donate.svg"
            slug="21233"
            date={new Date().toISOString()}
          />
        </ul>

        <Pagination
          className={cx("Pagination")}
          page={0}
          pageCount={100}
          onChangePage={() => {}}
        />
      </Container>
    </main>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PageNews;
