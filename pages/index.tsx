import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { Trans, useTranslation } from "next-i18next";
import Button from "components/UIKit/Button";
import {
  BREAKPOINT_LANDSCAPE,
  BREAKPOINT_TABLET,
  CONTACT_MAIL,
  URL_MAP,
} from "constant";
import {
  IconArrowDown,
  IconBox,
  IconCar,
  IconHold,
  IconMedal,
  IconPin,
  IconUah,
  IconUsers,
  IconWarehouse,
} from "components/Icons";
import ButtonLink from "components/UIKit/ButtonLink";
import NewsCard from "components/NewsCard";
import FormNeedHelp from "containers/forms/NeedHelp";
import Title from "components/UIKit/Title";
import Container from "components/UIKit/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWidthCondition } from "helpers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getNews, { GetNewsResponse } from "api/getNews";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const cx = classNames.bind(styles);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home = ({ news }: Props) => {
  const { t } = useTranslation();
  const isTablet = useWidthCondition(
    (w) => w < BREAKPOINT_TABLET && w >= BREAKPOINT_LANDSCAPE
  );

  return (
    <main className={cx("Component")}>
      <Container className={cx("IntroContainer")}>
        <section className={cx("Intro")}>
          <h1>
            <Trans i18nKey="pageHome.intro.title" components={{ b: <b /> }} />
          </h1>

          <p>{t("pageHome.intro.text.0")}</p>
          <p>{t("pageHome.intro.text.1")}</p>
          <p>{t("pageHome.intro.text.2")}</p>

          <div className={cx("IntroBtnGroup")}>
            <Button
              color="primary"
              tag="link"
              linkProps={{ href: URL_MAP.donate }}
            >
              {t("global.help")}
            </Button>
            <Button
              color="secondary"
              tag="link"
              linkProps={{ href: URL_MAP.aboutFoundation.index }}
            >
              {t("pageHome.intro.btnDetails")}
            </Button>
          </div>
        </section>
      </Container>
      <Container>
        <section className={cx("Section", "Activity")}>
          <Title tag="h2" className={cx("Title")}>
            {t("pageHome.activity.title")}
          </Title>
          <ul className={cx("ActivityItems")}>
            <li>
              <i>
                <IconMedal />
              </i>
              <h3>{t("pageHome.activity.items.0.title")}</h3>
              <p>{t("pageHome.activity.items.0.description")}</p>
            </li>
            <li>
              <i>
                <IconBox />
              </i>
              <h3>{t("pageHome.activity.items.1.title")}</h3>
              <p>{t("pageHome.activity.items.1.description")}</p>
            </li>{" "}
            <li>
              <i>
                <IconMedal />
              </i>
              <h3>{t("pageHome.activity.items.2.title")}</h3>
              <p>{t("pageHome.activity.items.2.description")}</p>
            </li>
          </ul>
        </section>

        <section className={cx("Section", "Resources")}>
          <div className={cx("ResourcesMain")}>
            <Title tag="h2" className={cx("Title")}>
              {t("pageHome.resources.title")}
            </Title>

            <ul className={cx("ResourcesItems")}>
              <li>
                <i>
                  <IconPin />
                </i>
                <div>
                  <h3>{t("pageHome.resources.items.0.title")}</h3>
                  <p>{t("pageHome.resources.items.0.description")}</p>
                </div>
              </li>
              <li>
                <i>
                  <IconWarehouse />
                </i>
                <div>
                  <h3>{t("pageHome.resources.items.1.title")}</h3>
                </div>
              </li>
              <li>
                <i>
                  <IconCar />
                </i>
                <div>
                  <h3>{t("pageHome.resources.items.2.title")}</h3>
                  <p>{t("pageHome.resources.items.2.description")}</p>
                </div>
              </li>
              <li>
                <i>
                  <IconHold />
                </i>
                <div>
                  <h3>{t("pageHome.resources.items.3.title")}</h3>
                </div>
              </li>
            </ul>
          </div>
          <div className={cx("ResourcesImage")}>
            <img
              src={
                isTablet
                  ? "/images/home_resources-long.svg"
                  : "/images/home_resources.svg"
              }
              alt=""
            />
          </div>
        </section>

        <section className={cx("Section", "Donate")}>
          <div className={cx("DonateImage")}>
            <img
              src={
                isTablet
                  ? "/images/home_donate-long.svg"
                  : "/images/home_donate.svg"
              }
              alt=""
            />
          </div>

          <div className={cx("DonateMain")}>
            <Title tag="h2" className={cx("Title")}>
              {t("pageHome.donate.title")}
            </Title>

            <ul className={cx("DonateItems")}>
              <li>
                <i>
                  <IconUah />
                </i>
                <div>
                  <h3>{t("pageHome.donate.items.0.title")}</h3>
                  <p>{t("pageHome.donate.items.0.description")}</p>
                  <ButtonLink
                    fontWeight="bold"
                    color="green"
                    tag="link"
                    linkProps={{ href: URL_MAP.donate }}
                  >
                    <span>{t("pageHome.donate.items.0.link")}</span>
                    <IconArrowDown className={cx("DonateItemsIcon")} />
                  </ButtonLink>
                </div>
              </li>
              <li>
                <i>
                  <IconBox />
                </i>
                <div>
                  <h3>{t("pageHome.donate.items.1.title")}</h3>
                  <p>{t("pageHome.donate.items.1.description")}</p>
                  <ButtonLink
                    fontWeight="bold"
                    color="green"
                    tag="link"
                    linkProps={{ href: URL_MAP.donate }}
                  >
                    <span>{t("pageHome.donate.items.1.link")}</span>
                    <IconArrowDown className={cx("DonateItemsIcon")} />
                  </ButtonLink>
                </div>
              </li>
              <li>
                <i>
                  <IconUsers />
                </i>
                <div>
                  <h3>{t("pageHome.donate.items.2.title")}</h3>
                  <p>{t("pageHome.donate.items.2.description")}</p>
                  <ButtonLink
                    fontWeight="bold"
                    color="green"
                    tag="a"
                    href={`mailto:${CONTACT_MAIL}`}
                  >
                    <span>{t("pageHome.donate.items.2.link")}</span>
                    <IconArrowDown className={cx("DonateItemsIcon")} />
                  </ButtonLink>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </Container>

      <News news={news} />
      <FormNeedHelp isIntroPage />
    </main>
  );
};

const News = ({ news }: Pick<Props, "news">) => {
  const [t] = useTranslation();
  const isLandscapeOrLess = useWidthCondition((w) => w < BREAKPOINT_LANDSCAPE);

  if (!news) return null;

  return (
    <section className={cx("Section", "News")}>
      <Container className={cx("NewsContainer")}>
        <div className={cx("NewsMain")}>
          <Title tag="h2" className={cx("Title")}>
            {t("pageHome.news.title")}
          </Title>
          <Button
            className={cx("NewsBtnMoreDesktop")}
            tag="link"
            linkProps={{ href: URL_MAP.news }}
            color="primary"
          >
            {t("pageHome.news.btnMore")}
          </Button>
        </div>

        {!!news?.results?.length &&
          (isLandscapeOrLess ? (
            <Swiper
              className={cx("NewsCardSlider")}
              slidesPerView="auto"
              loop
              spaceBetween={8}
              centeredSlides={true}
            >
              {news.results.map((post) => {
                return (
                  <SwiperSlide key={post.slug} className={cx("NewsCardSlide")}>
                    <NewsCard
                      tag="div"
                      title={post.title}
                      text={post.annotation}
                      preview={post.preview_photo}
                      slug={post.slug}
                      date={post.publication_date}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <ul className={cx("NewsItemList")}>
              {news.results.map((post) => {
                return (
                  <NewsCard
                    key={post.slug}
                    tag="div"
                    title={post.title}
                    text={post.annotation}
                    preview={post.preview_photo}
                    slug={post.slug}
                    date={post.publication_date}
                  />
                );
              })}
            </ul>
          ))}

        <Button
          className={cx("NewsBtnMoreMobile")}
          tag="link"
          linkProps={{ href: URL_MAP.news }}
          color="primary"
        >
          {t("pageHome.news.btnMore")}
        </Button>
      </Container>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  news: GetNewsResponse | null;
}> = async ({ locale }) => {
  const newsData = await getNews({
    locale: locale as string,
    offset: 0,
    limit: 3,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
      news: newsData.error || !newsData.data ? null : newsData.data,
    },
  };
};

export default Home;
