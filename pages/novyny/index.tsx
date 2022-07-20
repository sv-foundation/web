import getNews, { GetNewsResponse } from "api/getNews";
import getTags, { GetTagsResponse } from "api/getTags";
import classNames from "classnames/bind";
import NewsCard from "components/NewsCard";
import Pagination from "components/Pagination";
import SEO from "components/SEO";
import Button from "components/UIKit/Button";
import Container from "components/UIKit/Container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
const cx = classNames.bind(styles);

const NEWS_PER_PAGE = 16;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PageNews = ({ news, tags }: Props) => {
  const [t] = useTranslation();
  const router = useRouter();
  const currentPage = Number(router.query.page ?? 1);
  const selectedTag = router.query.tag;

  const onChangePage = (page: number) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = `${page + 1}`;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const onChangeTag = (newTag?: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.tag = newTag;
    currentQuery.page = '1'

    if (!currentQuery.tag) {
      delete currentQuery.tag
    }


    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  }

  return (
    <main className={cx("Page")}>
      <SEO
        title={t("pageNews.seo.title")}
        description={t("pageNews.seo.description")}
      />

      <Container className={cx("Container")}>
        <h1 className={cx("Title")}>{t("pageNews.title")}</h1>

        <div className={cx("Tags")}>
          <Button
            color={!selectedTag ? "primary" : "grey"}
            onClick={() => onChangeTag()}
          >
            {t("pageNews.tags.all")}
          </Button>

          {tags?.map(({ name, slug }) => {
            return (
              <Button
                key={slug}
                color={selectedTag === slug ? "primary" : "grey"}
                onClick={() => onChangeTag(slug)}
              >
                {name}
              </Button>
            );
          })}
        </div>

        <ul className={cx("NewsList")}>
          {news?.results?.map((post) => {
            return (
              <NewsCard
                key={post.id}
                title={post.title}
                text={post.annotation}
                preview={post.preview_photo}
                slug={post.slug}
                date={post.publication_date}
              />
            );
          })}
        </ul>

        <Pagination
          className={cx("Pagination")}
          page={currentPage - 1}
          pageCount={Math.ceil((news?.count) / NEWS_PER_PAGE)}
          onChangePage={onChangePage}
        />
      </Container>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<{
  news?: null | GetNewsResponse;
  tags?: null | GetTagsResponse;
}> = async ({ locale, query: { page = 1, tag } }) => {
  const newsData = await getNews({
    locale,
    offset: (Number(page) - 1) * NEWS_PER_PAGE,
    limit: NEWS_PER_PAGE,
    tags__name: tag === "all" ? undefined : (tag as string),
  });

  const tagsData = await getTags({
    locale,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      news: newsData.error || !newsData.data ? null : newsData.data,
      tags: tagsData.error || !tagsData.data ? null : tagsData.data,
    },
  };
};
export default PageNews;
